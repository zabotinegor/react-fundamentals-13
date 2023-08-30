import "./CreateCourse.css";

import React, { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { COURSES, TOKEN } from "../../constants/Pages";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthors } from "../../store/authors/selectors";
import { actions as authorActions } from "../../store/authors/reducer";
import { actions as courseActions } from "../../store/course/reducer";
import { Author, CreateAuthorRequest } from "../../types/authors";
import { AddCourseRequest } from "../../types/courses";

const CreateCourse: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [newAuthorName, setNewAuthorName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const availableAuthors = useSelector(selectAuthors);

  useEffect(() => {
    dispatch(authorActions.getAuthors());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    const newErrors: string[] = [];

    // Validate title
    if (title.length < 2) {
      newErrors.push("Title must be at least 2 characters");
    }

    // Validate description
    if (description.length < 2) {
      newErrors.push("Description must be at least 2 characters");
    }

    // Validate duration
    if (!/^\d+$/.test(duration)) {
      newErrors.push("Duration must be ONLY numbers");
    } else {
      const parsedDuration = parseInt(duration, 10);
      if (parsedDuration <= 0) {
        newErrors.push("Duration must be more than 0 minutes");
      }
    }

    // Validate authors
    if (authors.length === 0) {
      newErrors.push("At least one author is required");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem(TOKEN);
    if (!token) {
      console.error("Authorization token not found");
      return;
    }

    const addCourseRequest: AddCourseRequest = {
      token: token,
      title: title,
      description: description,
      duration: parseInt(duration, 10),
      authors: authors.map((author) => author.id),
      handleSuccess: () => {
        navigate(COURSES, { replace: true });
      },
      handleAPIError: (code) => {
        console.error(`Coould't create course: error code ${code}`);
        setErrors([...errors, `Coould't create course: error code ${code}`]);
      },
      handleError: (error) => {
        console.error(`Creation course failed: ${error}`, error);
        setErrors([...errors, `Creation course failed: ${error}`]);
      },
    };

    dispatch(courseActions.addCourse(addCourseRequest));
  };

  const handleNewAuthor = (e: React.MouseEvent) => {
    e.preventDefault();

    const createAuthorRequest: CreateAuthorRequest = {
      token: localStorage.getItem(TOKEN) || "",
      name: newAuthorName,
      handleSuccess: (newAuthor: Author | null) => {
        if (newAuthor) {
          setNewAuthorName("");
          dispatch(authorActions.getAuthors());
        } else {
          console.error(`Created author ${newAuthorName} is null!`);
          setErrors([...errors, `Created author ${newAuthorName} is null!`]);
        }
      },
      handleAPIError: (code) => {
        console.error(
          `Author with name ${newAuthorName} creation failed: error code ${code}`
        );
        setErrors([
          ...errors,
          `Author with name ${newAuthorName} creation failed: error code ${code}`,
        ]);
      },
      handleError: (error) => {
        console.error(
          `Author with name ${newAuthorName} creation failed: ${error}`,
          error
        );
        setErrors([
          ...errors,
          `Author with name ${newAuthorName} creation failed: ${error}`,
        ]);
      },
    };

    dispatch(authorActions.addAuthor(createAuthorRequest));
  };

  const handleAddAvailableAuthor = (e: React.MouseEvent, author: Author) => {
    e.preventDefault();

    if (!authors.some((existingAuthor) => existingAuthor.id === author.id)) {
      setAuthors([...authors, author]);
    }
  };

  const handleRemoveAuthor = (authorId: string) => {
    const updatedAuthors = authors.filter((author) => author.id !== authorId);
    setAuthors(updatedAuthors);
  };

  return (
    <div className="create-course-container">
      <h2 className="create-course-title">Create New Course</h2>
      <form className="create-course-form" onSubmit={handleSubmit}>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="title">
            Title:
          </label>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="description">
            Description:
          </label>
          <textarea
            className="create-course-input create-course-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="duration">
            Duration (minutes):
          </label>
          <Input
            type="text"
            placeholder="Duration in minutes"
            value={duration}
            onChange={setDuration}
          />
        </div>
        <div className="create-course-authors">
          <div className="new-author-list">
            <h3 className="list-title">Authors:</h3>
            <ul>
              {authors.map((author) => (
                <li key={author.id} className="author-item">
                  <span className="author-name">{author.name}</span>{" "}
                  <Button
                    text="Remove"
                    onClick={() => handleRemoveAuthor(author.id)}
                  />
                </li>
              ))}
            </ul>
            <div className="create-course-field">
              <Input
                type="text"
                placeholder="Author's Name"
                value={newAuthorName}
                onChange={setNewAuthorName}
              />
              <Button
                className="create-add-author-button"
                text="Add Author"
                onClick={handleNewAuthor}
              />
            </div>
          </div>
          <div className="available-author-list">
            <h3 className="list-title">Available authors:</h3>
            <ul>
              {availableAuthors.map((author) => (
                <li key={author.id} className="author-item">
                  <span className="author-name">{author.name}</span>{" "}
                  <Button
                    text="Add"
                    onClick={(e) => handleAddAvailableAuthor(e, author)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="error-list">
          {errors.map((error, index) => (
            <p key={index} className="error-item">
              {error}
            </p>
          ))}
        </div>
        <div className="button-list">
          <Button
            text="Create Course"
            className="create-course-create-button"
          />
          <Button
            text="Back to Courses"
            className="create-course-back-button"
            onClick={() => navigate(COURSES, { replace: true })}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;

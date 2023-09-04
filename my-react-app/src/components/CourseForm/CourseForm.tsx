import "./CourseForm.css";

import React, { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { COURSES, TOKEN } from "../../constants/Pages";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthors } from "../../store/authors/selectors";
import { actions as authorActions } from "../../store/authors/reducer";
import { actions as courseActions } from "../../store/course/reducer";
import { Author, CreateAuthorRequest } from "../../types/authors";
import {
  AddCourseRequest,
  GetCourseRequest,
  UpdateCourseRequest,
} from "../../types/courses";

const CourseForm: React.FC = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const availableAuthors = useSelector(selectAuthors);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    newAuthorName: "",
  });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loadedAuthors, setLoadedAuthors] = useState(false);

  useEffect(() => {
    if (!loadedAuthors) {
      dispatch(authorActions.getAuthors());
      setLoadedAuthors(true);
    }
  }, [dispatch, loadedAuthors]);

  useEffect(() => {
    if (courseId && availableAuthors.length > 0) {
      const request: GetCourseRequest = {
        courseId: courseId,
        handleSuccess: (course) => {
          setForm({
            title: course.title,
            description: course.description,
            duration: course.duration.toString(),
            newAuthorName: "",
          });
          setAuthors(
            availableAuthors.filter((author) =>
              course.authors.includes(author.id)
            )
          );
        },
      };
      dispatch(courseActions.getCurrentCourse(request));
    }
  }, [dispatch, availableAuthors, courseId]);

  const handleInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleNewAuthor = (e: React.MouseEvent) => {
    e.preventDefault();
    const { newAuthorName } = form;
    if (!newAuthorName) {
      setErrors(["Please, add the name of the author."]);
      return;
    }

    const createAuthorRequest: CreateAuthorRequest = {
      name: newAuthorName,
      handleSuccess: (newAuthor: Author | null) => {
        if (newAuthor) {
          setForm({
            ...form,
            newAuthorName: "",
          });
          dispatch(authorActions.getAuthors());
        } else {
          setErrors([`Created author ${newAuthorName} is null!`]);
        }
      },
      handleAPIError: (code) => {
        setErrors([
          `Author with name ${newAuthorName} creation failed: error code ${code}.`,
        ]);
      },
      handleError: (error) => {
        setErrors([
          `Author with name ${newAuthorName} creation failed: ${error}.`,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    const newErrors: string[] = [];

    // Validate title
    if (form.title.length < 2) {
      newErrors.push("Title must be at least 2 characters.");
    }

    // Validate description
    if (form.description.length < 2) {
      newErrors.push("Description must be at least 2 characters.");
    }

    // Validate duration
    if (!/^\d+$/.test(form.duration)) {
      newErrors.push("Duration must be ONLY numbers.");
    } else {
      const parsedDuration = parseInt(form.duration, 10);
      if (parsedDuration <= 0) {
        newErrors.push("Duration must be more than 0 minutes.");
      }
    }

    // Validate authors
    if (authors.length === 0) {
      newErrors.push("At least one author is required.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem(TOKEN);
    if (!token) {
      console.error("Authorization token not found.");
      return;
    }

    if (!courseId) {
      const addCourseRequest: AddCourseRequest = {
        title: form.title,
        description: form.description,
        duration: parseInt(form.duration, 10),
        authors: authors.map((author) => author.id),
        handleSuccess: () => {
          navigate(COURSES, { replace: true });
        },
        handleAPIError: (code) => {
          setErrors([`Couldn't create course: error code ${code}.`]);
        },
        handleError: (error) => {
          setErrors([`Creation course failed: ${error}.`]);
        },
      };

      dispatch(courseActions.addCourse(addCourseRequest));
    } else {
      const updateCourseRequest: UpdateCourseRequest = {
        courseId: courseId,
        title: form.title,
        description: form.description,
        duration: parseInt(form.duration, 10),
        authors: authors.map((author) => author.id),
        handleSuccess: () => {
          navigate(COURSES, { replace: true });
        },
        handleAPIError: (code) => {
          setErrors([`Couldn't update course: error code ${code}.`]);
        },
        handleError: (error) => {
          setErrors([`Update failed: ${error}.`]);
        },
      };

      dispatch(courseActions.updateCourse(updateCourseRequest));
    }
  };

  return (
    <div className="create-course-container">
      <h2 className="create-course-title">
        {courseId ? "Edit Course" : "Create New Course"}
      </h2>
      <form className="create-course-form" onSubmit={handleSubmit}>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="title">
            Title:
          </label>
          <Input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(value) => handleInputChange("title", value)}
          />
        </div>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="description">
            Description:
          </label>
          <textarea
            className="create-course-input create-course-textarea"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleTextAreaChange}
          />
        </div>
        <div className="create-course-field">
          <label className="create-course-label" htmlFor="duration">
            Duration (minutes):
          </label>
          <Input
            type="text"
            placeholder="Duration in minutes"
            value={form.duration}
            onChange={(value) => handleInputChange("duration", value)}
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
                value={form.newAuthorName}
                onChange={(value) => handleInputChange("newAuthorName", value)}
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
            text={courseId ? "Update Course" : "Create Course"}
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

export default CourseForm;

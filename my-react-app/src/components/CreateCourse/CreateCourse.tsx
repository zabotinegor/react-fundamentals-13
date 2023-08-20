import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { generateGUID } from "../../helpers/generateGUID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { COURSES, TOKEN } from "../../constants/Pages";

import "./CreateCourse.css";

interface Course {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

interface Author {
  id: string;
  name: string;
}

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [newAuthorName, setNewAuthorName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const createCourse = async (courseData: Course, token: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/courses/add",
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        console.log("Course created successfully");
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const createAuthor = async (authorName: string, token: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/authors/add",
        { name: authorName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.successful) {
        return response.data.result.id;
      } else {
        console.error("Failed to create author");
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };

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

    const courseData = {
      title: title,
      description: description,
      duration: parseInt(duration, 10),
      authors: authors.map((author) => author.id),
    };

    const token = localStorage.getItem(TOKEN);
    if (!token) {
      console.error("Authorization token not found");
      return;
    }

    const authorIds: string[] = [];
    for (const author of authors) {
      const authorId = await createAuthor(author.name, token);
      if (authorId) {
        authorIds.push(authorId);
      } else {
        console.error("Author creation failed");
        return;
      }
    }

    courseData.authors = authorIds;

    await createCourse(courseData, token);

    navigate(COURSES, { replace: true });
  };

  const handleAddAuthor = (e: React.MouseEvent) => {
    e.preventDefault();

    if (newAuthorName) {
      const newAuthor: Author = {
        id: generateGUID(),
        name: newAuthorName,
      };
      setAuthors([...authors, newAuthor]);
      setNewAuthorName("");
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
          <label className="create-course-label">Authors:</label>
          <ul>
            {authors.map((author) => (
              <li key={author.id} className="create-course-author">
                <span className="create-course-author-name">{author.name}</span>{" "}
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
              onClick={handleAddAuthor}
            />
          </div>
        </div>
        <div className="create-course-errors">
          {errors.map((error, index) => (
            <p key={index} className="create-course-error">
              {error}
            </p>
          ))}
        </div>
        <Button text="Create Course" />
      </form>
    </div>
  );
};

export default CreateCourse;

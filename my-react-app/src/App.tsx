import Course from "./components/CourseCard/CourseCard";
import Header from "./components/Header/Header";

const authors = [
  { name: "Author 1" },
  { name: "Author 2" },
  { name: "Author 3" },
  { name: "Author 4" },
  { name: "Author 5" },
];

function App() {
  return (
    <div className="App">
      <Header />
      <Course
        title="Introduction to React"
        duration="2:30 hours"
        creationDate="15.07.2023"
        description="Learn the basics of React programming."
        showCourseButton={true}
        authors={authors}
      />
    </div>
  );
}

export default App;

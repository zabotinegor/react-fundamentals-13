import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import { mockedCoursesList, mockedEmptyCoursesList } from "./mocks/Courses";

function App() {
  return (
    <div className="App">
      <Header />
      <Courses courses={mockedCoursesList} />
    </div>
  );
}

export default App;

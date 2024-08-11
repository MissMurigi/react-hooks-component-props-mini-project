import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ArticleList from "../components/ArticleList";

const posts = [
  {
    id: 1,
    title: "Components 101",
    date: "December 15, 2020",
    preview: "Setting up the building blocks of your site",
  },
  {
    id: 2,
    title: "React Data Flow",
    date: "December 11, 2020",
    preview: "Passing props is never passé",
  },
  {
    id: 3,
    title: "Function Components vs Class Components",
    date: "December 10, 2020",
    preview: "React, meet OOJS.",
  },
];

test("renders a <main> element", () => {
  const { container } = render(<ArticleList posts={posts} />);
  expect(container.querySelector("main")).toBeInTheDocument();
});

test("renders a Article component for each post passed as a prop", () => {
  const { container } = render(<ArticleList posts={posts} />);
  expect(container.querySelector("main").children).toHaveLength(3);
});
test("renders an empty list when no posts are provided", () => {
  const { container } = render(<ArticleList posts={[]} />)
  expect(container.querySelector("main")).toBeInTheDocument()
  expect(container.querySelector("main").children).toHaveLength(0)
})

test("renders correct number of articles when less than 3 posts are provided", () => {
  const lessPosts = posts.slice(0, 2)
  const { container } = render(<ArticleList posts={lessPosts} />)
  expect(container.querySelector("main").children).toHaveLength(2)
})

test("renders correct number of articles when more than 3 posts are provided", () => {
  const morePosts = [...posts, {
    id: 4,
    title: "Additional Post",
    date: "December 20, 2020",
    preview: "Extra content for testing",
  }]
  const { container } = render(<ArticleList posts={morePosts} />)
  expect(container.querySelector("main").children).toHaveLength(4)
})

test("does not render when posts prop is undefined", () => {
  const { container } = render(<ArticleList />)
  expect(container.querySelector("main")).not.toBeInTheDocument()
})

test("renders articles in the correct order", () => {
  const { getAllByRole } = render(<ArticleList posts={posts} />)
  const articles = getAllByRole("article")
  expect(articles[0]).toHaveTextContent("Components 101")
  expect(articles[1]).toHaveTextContent("React Data Flow")
  expect(articles[2]).toHaveTextContent("Function Components vs Class Components")
})

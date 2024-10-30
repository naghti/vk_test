import { it, expect, describe, vitest } from 'vitest';
import CommentsList from '../components/CommentsList';
import { render, screen } from '@testing-library/react';
import counter from "../store/counter"
import { commentsI } from '../interfaces/Comment';
import "@testing-library/jest-dom/vitest"

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), 
    removeListener: vitest.fn(),
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

const testComments: Array<commentsI> = [
  {
    postId: 1,
    id: 1,
    email: "title1",
    name: "title1",
    body: "body1",
  },
  {
    postId: 2,
    id: 2,
    email: "title2",
    name: "title2",
    body: "body2",
  },
  {
    postId: 3,
    id: 3,
    email: "title3",
    name: "title3",
    body: "body3",
  },
]

describe('CommentsList component', () => {
  it('should render without crashing', () => {
    counter.setComments(testComments)
    render(<CommentsList />);

    testComments.forEach(testComment => {
      const title = screen.getByText(
        new RegExp(`${testComment.id}. ${testComment.body}`, "i")
      )
      expect(title).toBeInTheDocument()
    })
  });
});

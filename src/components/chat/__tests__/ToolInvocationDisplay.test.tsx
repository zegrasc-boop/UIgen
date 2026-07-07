import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

describe("ToolInvocationDisplay", () => {
  describe("str_replace_editor tool", () => {
    it("displays 'Creating' message for create command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
          args={{ command: "create", path: "/components/Button.tsx" }}
        />
      );
      expect(screen.getByText("Creating Button.tsx")).toBeDefined();
    });

    it("displays 'Created' message when create is complete", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="result"
          args={{ command: "create", path: "/components/Button.tsx" }}
        />
      );
      expect(screen.getByText("Created Button.tsx")).toBeDefined();
    });

    it("displays 'Editing' message for str_replace command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
          args={{ command: "str_replace", path: "/App.tsx" }}
        />
      );
      expect(screen.getByText("Editing App.tsx")).toBeDefined();
    });

    it("displays 'Edited' message when str_replace is complete", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="result"
          args={{ command: "str_replace", path: "/App.tsx" }}
        />
      );
      expect(screen.getByText("Edited App.tsx")).toBeDefined();
    });

    it("displays 'Editing' message for insert command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
          args={{ command: "insert", path: "/utils.ts" }}
        />
      );
      expect(screen.getByText("Editing utils.ts")).toBeDefined();
    });

    it("displays 'Viewing' message for view command", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
          args={{ command: "view", path: "/index.tsx" }}
        />
      );
      expect(screen.getByText("Viewing index.tsx")).toBeDefined();
    });

    it("displays 'Viewed' message when view is complete", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="result"
          args={{ command: "view", path: "/index.tsx" }}
        />
      );
      expect(screen.getByText("Viewed index.tsx")).toBeDefined();
    });
  });

  describe("file_manager tool", () => {
    it("displays 'Deleting' message for delete command", () => {
      render(
        <ToolInvocationDisplay
          toolName="file_manager"
          state="partial"
          args={{ command: "delete", path: "/old-file.tsx" }}
        />
      );
      expect(screen.getByText("Deleting old-file.tsx")).toBeDefined();
    });

    it("displays 'Deleted' message when delete is complete", () => {
      render(
        <ToolInvocationDisplay
          toolName="file_manager"
          state="result"
          args={{ command: "delete", path: "/old-file.tsx" }}
        />
      );
      expect(screen.getByText("Deleted old-file.tsx")).toBeDefined();
    });

    it("displays 'Moving' message for rename command", () => {
      render(
        <ToolInvocationDisplay
          toolName="file_manager"
          state="partial"
          args={{
            command: "rename",
            path: "/old.tsx",
            new_path: "/new.tsx",
          }}
        />
      );
      expect(screen.getByText("Moving old.tsx → new.tsx")).toBeDefined();
    });

    it("displays 'Moved' message when rename is complete", () => {
      render(
        <ToolInvocationDisplay
          toolName="file_manager"
          state="result"
          args={{
            command: "rename",
            path: "/old.tsx",
            new_path: "/new.tsx",
          }}
        />
      );
      expect(screen.getByText("Moved old.tsx → new.tsx")).toBeDefined();
    });
  });

  describe("loading state", () => {
    it("shows spinner when state is not result", () => {
      const { container } = render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
          args={{ command: "create", path: "/test.tsx" }}
        />
      );
      expect(container.querySelector(".animate-spin")).toBeDefined();
    });

    it("shows green dot when state is result", () => {
      const { container } = render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="result"
          args={{ command: "create", path: "/test.tsx" }}
        />
      );
      expect(container.querySelector(".bg-emerald-500")).toBeDefined();
    });
  });

  describe("fallback behavior", () => {
    it("displays tool name for unknown tools", () => {
      render(
        <ToolInvocationDisplay
          toolName="unknown_tool"
          state="partial"
          args={{}}
        />
      );
      expect(screen.getByText("unknown_tool")).toBeDefined();
    });

    it("handles missing args gracefully", () => {
      render(
        <ToolInvocationDisplay
          toolName="str_replace_editor"
          state="partial"
        />
      );
      expect(screen.getByText("Modifying")).toBeDefined();
    });
  });
});

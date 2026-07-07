"use client";

import { Loader2, FilePlus, FileEdit, Eye, Trash2, FolderInput } from "lucide-react";

interface ToolInvocationDisplayProps {
  toolName: string;
  state: string;
  args?: Record<string, unknown>;
}

interface ToolDisplayInfo {
  icon: React.ReactNode;
  label: string;
}

function getFileName(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] || path;
}

function getToolDisplayInfo(
  toolName: string,
  args?: Record<string, unknown>
): ToolDisplayInfo {
  const path = args?.path as string | undefined;
  const command = args?.command as string | undefined;
  const fileName = path ? getFileName(path) : "";

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return {
          icon: <FilePlus className="w-3 h-3" />,
          label: `Creating ${fileName}`,
        };
      case "str_replace":
        return {
          icon: <FileEdit className="w-3 h-3" />,
          label: `Editing ${fileName}`,
        };
      case "insert":
        return {
          icon: <FileEdit className="w-3 h-3" />,
          label: `Editing ${fileName}`,
        };
      case "view":
        return {
          icon: <Eye className="w-3 h-3" />,
          label: `Viewing ${fileName}`,
        };
      default:
        return {
          icon: <FileEdit className="w-3 h-3" />,
          label: `Modifying ${fileName}`,
        };
    }
  }

  if (toolName === "file_manager") {
    const newPath = args?.new_path as string | undefined;
    const newFileName = newPath ? getFileName(newPath) : "";

    switch (command) {
      case "delete":
        return {
          icon: <Trash2 className="w-3 h-3" />,
          label: `Deleting ${fileName}`,
        };
      case "rename":
        return {
          icon: <FolderInput className="w-3 h-3" />,
          label: `Moving ${fileName} → ${newFileName}`,
        };
      default:
        return {
          icon: <FolderInput className="w-3 h-3" />,
          label: `Managing ${fileName}`,
        };
    }
  }

  // Fallback for unknown tools
  return {
    icon: <FileEdit className="w-3 h-3" />,
    label: toolName,
  };
}

export function ToolInvocationDisplay({
  toolName,
  state,
  args,
}: ToolInvocationDisplayProps) {
  const isComplete = state === "result";
  const { icon, label } = getToolDisplayInfo(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-medium border border-neutral-200">
      {isComplete ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{label.replace(/^(Creating|Editing|Viewing|Deleting|Moving|Managing)/, (match) => {
            // Convert to past tense for completed actions
            const pastTense: Record<string, string> = {
              "Creating": "Created",
              "Editing": "Edited",
              "Viewing": "Viewed",
              "Deleting": "Deleted",
              "Moving": "Moved",
              "Managing": "Managed",
            };
            return pastTense[match] || match;
          })}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{label}</span>
        </>
      )}
    </div>
  );
}

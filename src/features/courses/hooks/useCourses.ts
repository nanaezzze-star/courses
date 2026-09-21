import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export type contentCourses = "Lecture" | "Quiz" | "Course";

export function useCourses() {
  const [activeTab, setActiveTab] = useState<contentCourses>("Course");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAuth, setSelectedAuth] = useState<string>("");

  const { data: courses = [], isLoading: loading } = useQuery({
    queryKey: ["courses", activeTab],
    queryFn: () => courseService.getCourseByContent(activeTab),
  });

  const authors = Array.from(
    new Set(courses.map((c) => c.authorName).filter(Boolean)), //unique list of authors
  );

  const filteredCourses = courses.filter((course) => {
    const search = course.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchAuthors = selectedAuth
      ? course.authorName === selectedAuth
      : true;

    return search && matchAuthors;
  });
  const handleReset = () => {
    setSearchQuery("");
    setSelectedAuth("");
  };
  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedAuth,
    setSelectedAuth,
    authors,
    filteredCourses,
    loading,
    handleReset,
  };
}

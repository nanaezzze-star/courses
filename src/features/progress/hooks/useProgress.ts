import { useState, useMemo } from "react";
import { progressService } from "../services/progressService";
import type { Progress } from "../types/progress";
import { courseService } from "@/features/courses";
import { useQuery } from "@tanstack/react-query";

export interface Employees {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userPosition: string;
  userAvatarUrl?: string;
  courses: (Progress & { courseName?: string })[];
}

export function useProgress() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const {data: courses =[]} = useQuery({
    queryKey:['courses', 'all'],
    queryFn:courseService.getAllCourses
  })

  const {data: progressData = [], isLoading: loading} = useQuery({
        queryKey:['progress'],
    queryFn:progressService.getAllProgresses,
  })
  const rawEmployees = useMemo(() => {
    const courseMap = new Map(courses.map((c)=>[c.id, c.name]))
    const map = new Map<string, Employees>();

    progressData.forEach((item) => {
      //create a new employee card
      if (!map.has(item.userId)) {
        map.set(item.userId, {
          userId: item.userId,
          userFirstName: item.userFirstName,
          userLastName: item.userLastName,
          userPosition: item.userPosition,
          userAvatarUrl: item.userAvatarUrl,
          courses: [],
        });
      }
      const enrichedItem = {
        ...item,
        courseName: courseMap.get(item.courseId)|| item.courseId
      }
      map.get(item.userId)!.courses.push(enrichedItem)
   
    });
    return Array.from(map.values());
  }, [progressData, courses]);

  const positions = useMemo(() => {
    return Array.from(
      new Set(rawEmployees.map((e) => e.userPosition).filter(Boolean)),
    );
  }, [rawEmployees]);

  const employees = useMemo(() => {
    //filiter employee
    return rawEmployees.filter((employee) => {
      const fullName =
        `${employee.userFirstName} ${employee.userLastName}`.toLowerCase();

      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition
        ? employee.userPosition === selectedPosition
        : true;

      return matchesSearch && matchesPosition;
    });
  }, [rawEmployees, searchQuery, selectedPosition]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPosition("");
  };

  return {
    employees,
    loading,
    searchQuery,
    setSearchQuery,
    selectedPosition,
    setSelectedPosition,
    positions,
    handleReset,
    totalCount: employees.length,
  };
}

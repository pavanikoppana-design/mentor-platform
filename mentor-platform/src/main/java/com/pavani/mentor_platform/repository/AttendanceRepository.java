package com.pavani.mentor_platform.repository;

import com.pavani.mentor_platform.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findBySessionCode(String sessionCode);
}
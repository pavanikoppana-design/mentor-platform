package com.pavani.mentor_platform.controller;

import com.pavani.mentor_platform.entity.Attendance;
import com.pavani.mentor_platform.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/mark")
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @GetMapping("/{sessionCode}")
    public List<Attendance> getAttendanceBySession(@PathVariable String sessionCode) {
        return attendanceRepository.findBySessionCode(sessionCode);
    }
}
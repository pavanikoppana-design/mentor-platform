package com.pavani.mentor_platform.controller;

import com.pavani.mentor_platform.entity.SessionRoom;
import com.pavani.mentor_platform.repository.SessionRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin("*")
public class SessionRoomController {

    @Autowired
    private SessionRoomRepository sessionRoomRepository;

    @PostMapping("/create")
    public SessionRoom createSession(@RequestBody SessionRoom room) {
        room.setSessionCode(UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        return sessionRoomRepository.save(room);
    }

    @GetMapping
    public List<SessionRoom> getAllSessions() {
        return sessionRoomRepository.findAll();
    }

    @GetMapping("/join/{code}")
    public SessionRoom joinSession(@PathVariable String code) {
        Optional<SessionRoom> room = sessionRoomRepository.findBySessionCode(code);
        return room.orElse(null);
    }

    @GetMapping("/test-create")
    public SessionRoom testCreateSession() {
        SessionRoom room = new SessionRoom();
        room.setRoomName("Java Mentorship");
        room.setMentorName("Pavani Mentor");
        room.setSessionCode(UUID.randomUUID().toString().substring(0, 6).toUpperCase());

        return sessionRoomRepository.save(room);
    }
}
CREATE TABLE booking_travelers (
    booking_id INT NOT NULL,
    traveler_id INT NOT NULL,
    requested_seat VARCHAR(10),
    assigned_seat VARCHAR(10),
    seat_status VARCHAR(20) DEFAULT 'pending' CHECK (seat_status IN ('pending','confirmed','failed')),
    PRIMARY KEY (booking_id, traveler_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (traveler_id) REFERENCES travelers(traveler_id) ON DELETE CASCADE
);


select * from booking_travelers;
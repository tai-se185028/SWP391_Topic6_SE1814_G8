import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";

export default function Schedule() {
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

    const getStartOffset = () => {
        const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Chủ Nhật => cuối tuần
    };

    return (
        <div>
            <Navbar username="Username" />

            <div className="content-wrapper">

                {/* Main Calendar */}
                <div className="schedule-main">
                    <h2>Tên phương tiện</h2>

                    {/* Chọn tháng & năm */}
                    <div className="date-select">
                        <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                            ))}
                        </select>

                        <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
                            {[2024, 2025, 2026].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {/* Calendar Grid */}
                    {/* Hàng hiển thị thứ */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            maxWidth: "280px",
                            textAlign: "center",
                            fontWeight: "bold",
                            marginBottom: "4px"
                        }}
                    >
                        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => (
                            <div key={i}>{day}</div>
                        ))}
                    </div>

                    {/* Lịch ngày đúng thực tế */}
                    <div
                        className="calendar-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            gap: "6px",
                            maxWidth: "280px"
                        }}
                    >
                        {/* Tính thứ của ngày 1 trong tháng */}
                        {Array.from({
                            length: (() => {
                                const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
                                return firstDay === 0 ? 6 : firstDay - 1; // Chủ Nhật => cuối tuần
                            })()
                        }).map((_, i) => (
                            <div key={`empty-${i}`}></div>
                        ))}

                        {/* Hiển thị các ngày */}
                        {Array.from({ length: daysInMonth(selectedMonth, selectedYear) }, (_, i) => (
                            <div
                                key={i + 1}
                                className={`calendar-day ${selectedDay === i + 1 ? "selected" : ""}`}
                                onClick={() => setSelectedDay(i + 1)}
                                style={{
                                    padding: "8px",
                                    textAlign: "center",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    background: selectedDay === i + 1 ? "linear-gradient(45deg, #d47dff, #79c7ff)" : "transparent",
                                    color: selectedDay === i + 1 ? "white" : "black",
                                    fontWeight: selectedDay === i + 1 ? "bold" : "normal"
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
}

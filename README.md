🚀 Virtual Memory Optimization Simulator

A visual, interactive tool to understand paging, demand paging, page faults, and page replacement algorithms.

📘 Overview

The Virtual Memory Optimization Simulator is a browser-based educational tool that demonstrates how operating systems handle memory using paging and page replacement algorithms.
It provides a real-time, step-by-step visualization of memory frame updates, page faults, and algorithm behavior  making OS concepts easier and more intuitive for learners. 


This project is built using HTML, CSS, and Vanilla JavaScript, with no external libraries.
It runs directly in any modern web browser.

🎯 Features
🔹 Core Functionalities

👉 Enter custom number of frames

👉 Enter custom page reference string

👉 Choose between:

LRU (Least Recently Used)

Optimal Page Replacement Algorithm

👉 Run simulation step-by-step or full execution

👉 LIVE visualization of physical memory frames

👉 Automatic detection of HIT or FAULT

👉 Color-coded frames with animations for clarity

👉 Detailed simulation log window

👉 Simple conceptual segmentation view
(Code, Data, Stack — static illustration)

🔹 Educational Benefits

Understand how the OS loads pages into memory

See why page faults occur

Compare LRU vs Optimal behavior

Learn memory management visually (great for OS labs)


🛠️ Tech Stack
Category	Technology
Frontend	HTML5, CSS3
Logic Engine	JavaScript (ES6+)
Dependencies	None (Vanilla JS)
Execution	Any modern web browser
📂 Project Structure
├── index.html        # Main UI layout
├── style.css         # Styling and animations
├── script.js         # Simulation core logic
└── README.md         # Project documentation

🧠 How It Works

The simulation follows the standard OS paging workflow: 


Load user inputs (frames, page reference string, algorithm)

Process one page at a time

Check if the page exists in memory

If HIT → highlight & continue

If FAULT → replace a page based on selected algorithm

Update memory frames

Log the action

Continue until all pages are processed

🔸 LRU Algorithm

Replaces the page that has not been used for the longest time.

🔸 Optimal Algorithm

Replaces the page that will not be used for the longest time in the future.

▶️ How to Use

Open index.html in any browser

Enter the number of frames

Enter a page reference string (comma-separated)

Select the algorithm (LRU or Optimal)

Click:

Run Step → process one page

Run Full → run entire simulation

Reset → clear frames & logs

🔮 Future Enhancements

Based on the project report, future improvements may include: 

Document 3

Adding FIFO and Clock page replacement algorithms

Detailed fragmentation visualization

Performance charts (Hit Ratio, Fault Curve)

Full dynamic segmentation implementation

Input validation and improved error handling

🙌 Credits

Developed by Lakshya Grover

Operating system theory references:
Operating System Concepts – Silberschatz, Galvin, Gagne

MDN Web Docs for HTML/CSS/JS guidance
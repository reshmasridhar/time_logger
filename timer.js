let timerInterval;
        let startTime;
        let isTimerRunning = false;

        function startStopTimer() {
            //selection
            const startStopBtn = document.getElementById('startStopBtn');
            const taskInput = document.getElementById('task').value.trim();
            const descriptionInput = document.getElementById('description').value.trim();

            if (isTimerRunning) {
                // Stop the timer
                clearInterval(timerInterval);
                startStopBtn.innerText = 'Start';
                startStopBtn.classList.remove('stop');
                isTimerRunning = false;

                // Add task details to the table
                if (taskInput && descriptionInput) {
                    const elapsedTime = new Date().getTime() - startTime;
                    const formattedTime = formatTime(elapsedTime);
                    addToTaskTable(taskInput, descriptionInput, formattedTime);

                    // Clear input fields and reset timer
                    document.getElementById('task').value = '';
                    document.getElementById('description').value = '';
                    document.getElementById('timer').innerText = '00:00:00';
                }
            } else {
                // Start the timer
                startTime = new Date().getTime();
                timerInterval = setInterval(updateTimer, 10);
                startStopBtn.innerText = 'Stop';
                startStopBtn.classList.add('stop');
                isTimerRunning = true;
            }
        }

        function updateTimer() {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;

            const minutes = Math.floor(elapsedTime / (60 * 1000));
            const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);

            const timerDisplay = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
            document.getElementById('timer').innerText = timerDisplay;
        }

        function padTime(time) {
            return (time < 10 ? '0' : '') + time;
        }

        function formatTime(elapsedTime) {
            const minutes = Math.floor(elapsedTime / (60 * 1000));
            const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);

            return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
        }

        function addToTaskTable(task, description, timeTaken) {
            const tableBody = document.getElementById('taskTableBody');
            const newRow = tableBody.insertRow();
            const cellTask = newRow.insertCell(0);
            const cellDescription = newRow.insertCell(1);
            const cellTimeTaken = newRow.insertCell(2);

            cellTask.innerText = task;
            cellDescription.innerText = description;
            cellTimeTaken.innerText = timeTaken;
        }
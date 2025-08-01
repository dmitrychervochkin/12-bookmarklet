javascript: (function () {
    const existingModal = document.getElementById('pomodoro-config-modal');
    const existingTimer = document.getElementById('pomodoro-timer-overlay');
    if (existingModal) {
        existingModal.remove();
        return;
    }
    if (existingTimer) return;
    const modal = document.createElement('div');
    modal.id = 'pomodoro-config-modal';
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = '⏱ Установите таймер:';
    modalTitle.style.color = 'black';
    const inputWork = document.createElement('input');
    const inputBreak = document.createElement('input');
    const btnStart = document.createElement('button');
    const btnCancel = document.createElement('button');
    const styleInput = (el, placeholder, value) => {
        el.type = 'number';
        el.placeholder = placeholder;
        el.value = value;
        el.min = 1;
        el.style.margin = '10px 0';
        el.style.padding = '10px';
        el.style.width = '100%';
        el.style.color = 'black';
        el.style.border = '1px solid #ccc';
        el.style.borderRadius = '8px';
        el.style.boxSizing = 'border-box';
        el.style.fontSize = '14px';
        el.style.backgroundColor = '#f9f9f9';
    };
    styleInput(inputWork, 'Минут работы', 25);
    styleInput(inputBreak, 'Минут отдыха', 5);
    const styleButton = (btn, bg) => {
        btn.style.padding = '10px';
        btn.style.marginTop = '10px';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.backgroundColor = bg;
        btn.style.color = '#fff';
        btn.style.fontSize = '14px';
        btn.style.cursor = 'pointer';
        btn.style.width = '48%';
    };
    btnStart.textContent = '▶️ Старт';
    btnCancel.textContent = '✖️ Отменить';
    styleButton(btnStart, '#007aff');
    styleButton(btnCancel, '#888');
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'space-between';
    btnContainer.append(btnStart, btnCancel);
    Object.assign(modal.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '20px 30px',
        borderRadius: '16px',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        zIndex: 99999,
        fontFamily: 'Segoe UI, sans-serif',
        minWidth: '280px',
        textAlign: 'center',
    });
    modal.append(modalTitle, inputWork, inputBreak, btnContainer);
    document.body.appendChild(modal);
    btnCancel.onclick = () => {
        modal.style.display = 'none';
    };
    btnStart.onclick = () => {
        const work = parseInt(inputWork.value, 10);
        const rest = parseInt(inputBreak.value, 10);
        if (isNaN(work) || isNaN(rest) || work <= 0 || rest <= 0) {
            alert('Укажите валидные значения.');
            return;
        }
        modal.remove();
        runTimer(work * 60, rest * 60);
    };
    function runTimer(workTime, restTime) {
        let isWork = true;
        let remaining = workTime;
        const overlay = document.createElement('div');
        overlay.id = 'pomodoro-timer-overlay';
        Object.assign(overlay.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 16px',
            background: 'rgba(0, 128, 0, 0.85)',
            color: '#fff',
            font: '16px monospace',
            borderRadius: '8px',
            zIndex: 99999,
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'background 0.3s',
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            position: 'fixed',
            minWidth: '160px',
        });
        const stopBtn = document.createElement('button');
        stopBtn.textContent = '⏹';
        Object.assign(stopBtn.style, {
            display: 'none',
            padding: '4px 8px',
            fontSize: '12px',
            border: 'none',
            borderRadius: '6px',
            background: '#c00',
            color: '#fff',
            cursor: 'pointer',
        });
        overlay.appendChild(stopBtn);
        document.body.appendChild(overlay);

        overlay.addEventListener('mouseenter', () => {
            stopBtn.style.display = 'inline-block';
        });
        overlay.addEventListener('mouseleave', () => {
            stopBtn.style.display = 'none';
        });
        stopBtn.onclick = (e) => {
            e.stopPropagation();
            clearInterval(timer);
            overlay.remove();
            notify('⏹ Pomodoro остановлен', 'До следующей сессии!');
        };
        function notify(title, message) {
            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    new Notification(title, { body: message });
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then((p) => {
                        if (p === 'granted') {
                            new Notification(title, { body: message });
                        }
                    });
                }
            } else {
                alert(title + '\n' + message);
            }
        }
        function format(t) {
            const m = Math.floor(t / 60)
                .toString()
                .padStart(2, '0');
            const s = (t % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }
        function update() {
            overlay.firstChild.nodeValue = `${
                isWork ? '💼 Работа' : '☕ Перерыв'
            }: ${format(remaining)}`;
            overlay.style.background = isWork
                ? 'rgba(0, 128, 0, 0.85)'
                : 'rgba(0, 0, 128, 0.85)';
        }
        function switchMode() {
            isWork = !isWork;
            remaining = isWork ? workTime : restTime;
            notify(
                isWork ? '🔔 Время работать!' : '🎉 Перерыв!',
                isWork
                    ? `Следующая сессия: ${workTime / 60} мин.`
                    : `Отдых: ${restTime / 60} мин.`
            );
            update();
        }
        overlay.addEventListener('click', () => {
            switchMode();
        });
        const timer = setInterval(() => {
            if (remaining <= 0) {
                switchMode();
            } else {
                remaining--;
                update();
            }
        }, 1000);
        overlay.insertBefore(document.createTextNode(''), stopBtn);
        update();
    }
})();

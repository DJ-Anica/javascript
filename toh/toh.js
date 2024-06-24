document.addEventListener('DOMContentLoaded', () => {
    const easyBtn = document.getElementById('easy');
    const mediumBtn = document.getElementById('medium');
    const hardBtn = document.getElementById('hard');
    const towers = [document.getElementById('tower1'), document.getElementById('tower2'), document.getElementById('tower3')];
    let numDisks;
    let selectedDisk = null;
    let sourceTower = null;
    let gameStarted = false;

    // Event listeners for mode buttons
    easyBtn.addEventListener('click', () => startGame(3));
    mediumBtn.addEventListener('click', () => startGame(4));
    hardBtn.addEventListener('click', () => startGame(5));

    function startGame(disks) {
        resetGame();
        numDisks = disks;
        renderTowers();
        gameStarted = true;
    }

    function resetGame() {
        towers.forEach(tower => {
            tower.innerHTML = '';
        });
        selectedDisk = null;
        sourceTower = null;
        gameStarted = false;
    }

    function renderTowers() {
        towers.forEach(tower => {
            tower.innerHTML = ''; // Clear towers
        });

        // Add disks to the first tower
        for (let i = numDisks; i > 0; i--) {
            const disk = document.createElement('div');
            disk.classList.add('disk');
            disk.style.width = `${20 + i * 10}px`; // Adjust disk width dynamically
            disk.style.backgroundColor = '#3498db'; // Default disk color
            towers[0].appendChild(disk);
        }
    }

    towers.forEach(tower => {
        tower.addEventListener('click', () => {
            if (!gameStarted) return;

            const clickedDisk = tower.lastElementChild;

            if (selectedDisk === null) {
                // Select disk from the clicked tower
                selectedDisk = clickedDisk;
                sourceTower = tower;
                if (selectedDisk) {
                    selectedDisk.classList.add('selected');
                }
            } else {
                // Move selected disk to the clicked tower
                const targetTower = tower;
                if (canMove(selectedDisk, sourceTower, targetTower)) {
                    moveDisk(selectedDisk, sourceTower, targetTower);
                    selectedDisk.classList.remove('selected');
                    selectedDisk = null;
                    sourceTower = null;
                    checkWinCondition();
                } else {
                    selectedDisk.classList.remove('selected');
                    selectedDisk = null;
                    sourceTower = null;
                }
            }
        });
    });

    function canMove(disk, source, target) {
        // Check if the move is valid (smaller disk cannot be placed on top of a larger disk)
        const sourceDisks = Array.from(source.children).reverse();
        const targetDisks = Array.from(target.children).reverse();
        const topSourceDisk = sourceDisks.find(d => d.classList.contains('disk'));
        const topTargetDisk = targetDisks.find(d => d.classList.contains('disk'));

        if (!topTargetDisk || parseInt(disk.style.width) < parseInt(topTargetDisk.style.width)) {
            return true;
        }

        return false;
    }

    function moveDisk(disk, source, target) {
        source.removeChild(disk);
        target.appendChild(disk);
    }

    function checkWinCondition() {
        // Check if all disks are moved to the last tower
        if (towers[2].childElementCount === numDisks) {
            alert('Congratulations! You solved the Tower of Hanoi puzzle.');
            resetGame();
        }
    }
});

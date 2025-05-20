document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des données à la première ouverture de la page
    fetchUsers();  // Charge les utilisateurs dès le début
    fetchKeys();   // Charge les clés dès le début

    // Fonction pour changer de panneau
    window.showPanel = function (panelId) {
        const panels = document.querySelectorAll(".panel");
        panels.forEach(panel => panel.classList.add("hidden"));

        const activePanel = document.getElementById(`${panelId}-panel`);
        if (activePanel) activePanel.classList.remove("hidden");

        if (panelId === "users") fetchUsers();
        if (panelId === "keys") fetchKeys();
    };

    // Fonction pour générer une clé
    window.generateKey = function () {
        const duration = document.getElementById("key-duration").value;
        fetch(`http://localhost/api/information/key/create`)
            .then(res => res.json())
            .then(data => {
                alert(`Clé générée: ${data.keys || "erreur inconnue"}`);
            })
            .catch(err => console.error("Erreur de génération:", err));
    };

    // Récupération des utilisateurs
    function fetchUsers() {
        fetch("http://localhost/api/information/user/all")
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById("users-list");
                container.innerHTML = "";
    
                if (data && data.length > 0) {
                    data.forEach(user => {
                        const box = document.createElement("div");
                        box.className = "user-box";
                        box.innerHTML = `
                            <div class="status-dot"></div>
                            <div class="info">
                                <p><strong>Username:</strong> ${user.username}</p>
                                <p><strong>Email:</strong> ${user.email}</p>
                            </div>
                            <button onclick="deleteUser('${user.username}', '${user.email}')">Supprimer</button>
                        `;
                        container.appendChild(box);
                    });
                } else {
                    container.innerHTML = "<p>Aucun utilisateur trouvé.</p>";
                }
            })
            .catch(err => console.error("Erreur de chargement utilisateurs:", err));
    }

    // Suppression d'un utilisateur
    window.deleteUser = function (username, email) {
        fetch(`http://localhost/api/information/user/delete-user?username=${username}`)
            .then(() => {
                fetchUsers();
            })
            .catch(err => console.error("Erreur de suppression:", err));
    };

    // Récupération des clés
    function fetchKeys() {
        fetch("http://localhost/api/information/key/all")
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById("keys-list");
                container.innerHTML = "";

                if (data && data.length > 0) {
                    data.forEach(key => {
                        const box = document.createElement("div");
                        box.className = "key-box";
                        box.innerHTML = `
                            <p><strong>Key:</strong> ${key.keys}</p>
                            <p><strong>Take:</strong> ${key.take}</p>
                            <p><strong>Valid:</strong> ${key.valid}</p>
                            <p><strong>HWID:</strong> ${key.hwid}</p>
                            <button onclick="resetHWID('${key.keys}')">Reset HWID</button>
                        `;
                        container.appendChild(box);
                    });
                } else {
                    container.innerHTML = "<p>Aucune clé disponible.</p>";
                }
            })
            .catch(err => console.error("Erreur de chargement des clés:", err));
    }

    // Reset HWID
    window.resetHWID = function (key) {
        fetch(`http://localhost/api/exemple`, { 
            method: "POST", 
            body: JSON.stringify({ key }), 
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => console.log(`HWID reset for ${key}`))
            .catch(err => console.error("Erreur reset HWID:", err));
    };
});

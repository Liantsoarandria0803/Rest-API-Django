      // Récupérer tous les livres et afficher dans la page
      function fetchBooks() {
        fetch('http://127.0.0.1:8000/api/AllBooks')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }
                return response.json();
            })
            .then(data => {
                const dataDiv = document.getElementById("data");
                dataDiv.innerHTML = data.map(book => `
                    <div class="book" data-id="${book.id}">
                        <h3>${book.title}</h3>
                        <p>Auteur: ${book.author}</p>
                        <p>ISBN: ${book.isbn}</p>
                        <p>Date de publication: ${book.published_date}</p>
                        <button onclick="deleteBook(${book.id})">Supprimer</button>
                        <button onclick="updateBook(${book.id})">Modifier</button>
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error("Erreur :", error);
                document.getElementById("data").textContent = "Erreur lors du chargement des données.";
            });
    }

    // Ajouter un nouveau livre
    document.getElementById("createForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const bookData = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            isbn: document.getElementById("isbn").value,
            published_date: document.getElementById("published_date").value,
            pages: document.getElementById("pages").value,
            cover: document.getElementById("cover").value,
            language: document.getElementById("language").value,
        };

        fetch('http://127.0.0.1:8000/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du livre");
            }
            return response.json();
        })
        .then(data => {
            console.log("Livre ajouté :", data);
            fetchBooks();  // Rafraîchir la liste des livres
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    });

    // Supprimer un livre
    function deleteBook(id) {
        fetch(`http://127.0.0.1:8000/api/book/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du livre");
            }
            console.log("Livre supprimé avec succès");
            fetchBooks();  // Rafraîchir la liste des livres
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    }

    // Modifier un livre
    function updateBook(id) {
        const title = prompt("Nouveau titre :");
        const author = prompt("Nouvel auteur :");
        const isbn = prompt("Nouvel ISBN :");
        const published_date = prompt("Nouvelle date de publication (YYYY-MM-DD) :");
        const pages=prompt("pages: ")
        const couverture=prompt("Couverture: ")
        const language=prompt("Langage")

        const updatedData = {
            title: title,
            author: author,
            isbn: isbn,
            published_date: published_date,
            pages:pages,
            cover:couverture,
            language:language
        };

        fetch(`http://127.0.0.1:8000/api/book/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la modification du livre");
            }
            return response.json();
        })
        .then(data => {
            console.log("Livre modifié :", data);
            fetchBooks();  // Rafraîchir la liste des livres
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
    }

    // Charger tous les livres au démarrage
    fetchBooks();
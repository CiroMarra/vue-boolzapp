//Milestone 1
//- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
//- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
//Milestone 2
//- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
//- Click sul contatto mostra la conversazione del contatto cliccato
// Milestone 3
// - Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// - Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo
// Milestone 4
// - Ricerca utenti: 
// scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina ->
//  Scrivo “mar” rimangono solo Marco e Martina).




const { createApp } = Vue;


createApp({
    data() {
        return {
            contacts: [{
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [{
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [{
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [{
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [{
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            filteredContacts: [], //  array per i contatti filtratti tramite input di ricerca
            selectedContactIndex: 0, // indice del contatto selezionato, parte da 0 in modo che venga mostrato sempre un contatto iniziale
            userInput: '', // input dell'utente per l'invio dei messaggi
            searchText: '', // testo di ricerca per filtrare i contatti 
            data: {
                timestamp: "" // serve per richiamare la funzione di TimeStamp per permettere di visualizzare l'orario corrente.
             },
        };
    },


  
    methods: {
        // funzione per selezionare un contatto tramite indice
        selectContact(index) {
            this.selectedContactIndex = index;
            console.log(this.selectedContactIndex);
        },

        getTimeStamp() {
            const timestamp = luxon.DateTime.local().toLocaleString(luxon.DateTime.DATETIME_SHORT_WITH_SECONDS)
            return luxon.DateTime.local().toFormat('HH:mm'); // mostra nei messaggi l'orario corrente (l'orario è preso direttamente dal proprio computer quindi si aggiorna in tempo reale ad ogni invio)
        },
        // funzione che filtra i contatti in base alla ricerca dell'utente 
        filterContacts() {
            const search = this.searchText.toLowerCase(); // converte il testo di ricerca dell'utente in minuscolo in modo che i contatti risultino essere scritti tutti nella stessa maniera 
            if (search === '') {
                this.filteredContacts = this.contacts; // se non c'è nulla nel input di ricerca mostra tutti i contatti della lista
            } else {
                this.filteredContacts = this.contacts.filter(contact => {
                    const name = contact.name.toLowerCase();
                    return name.includes(search); // filtra i contatti in base a cosa l'utente ha scritto nel input di ricerca.
                });
            }
        },
        // funzione che va ad inviare un messaggio 
        sendMessage() {
            if (this.userInput.trim() === '') return; // controlla che il messaggio inviato dall'utente non sia un messaggio vuoto, in caso fosse vuoto non lo invierà 
            this.contacts[this.selectedContactIndex].messages.push({ // invia a l'array il messaggio dell'utente per mostrarlo all'interno della chat
                message: this.userInput.trim(),
                status: 'sent'
     
            });
    
            setTimeout(() => { // va a simulare una risposta a l'utente dopo 1 secondo la risposta simulata è "ok"
                this.contacts[this.selectedContactIndex].messages.push({
                    message: 'Ok',
                    status: 'received'
                  
                });
            }, 1000);
            this.userInput = ''; // pulisce il campo imput dopo che l'utente ha mandato il messaggio
        },
    
  
    },
}).mount('#app');


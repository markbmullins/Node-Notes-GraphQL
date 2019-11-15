# Node-Notes


***
In Progress: I am currently converting this repo from REST to GraphQL.
***

## About  

A MERN markdown note taking app that is build on React, Express, Node and 
MongoDB. It uses a REST backend for CRUD operations on notes.

It has three panels, a notes panel in which you can select or delete notes, or
create new notes, an editing panel where you can edit the title and content of
the currently selected note, and save your updates, and a markdown rendering
panel where you can see how your note looks when parsed.

## To start the app

### Install mongo
`brew install mongodb`

`mkdir -p /data/db`

`mongod` to start daemon

in a second terminal: `mongo` `use notes`


### Clone repo
`git clone https://github.com/markbmullins/Node-Notes.git`

`cd Node-Notes`

### Server
`yarn install`

`nodemon`

The server is now running on port 3001 and will hot reload.

### Client
In another terminal: 

`cd Node-Notes`

`cd client`

`yarn install`

`yarn start`

The client is now running on localhost:3000.

In this demo you can see all CRUD operations, along with refreshes to between
them to show the state is maintained.

![Demo gif](./demo.gif)


## GraphQL  

```

{
  note(id:"5dcc655b86d69d20ba3aecbd") {
    title
    content
    id
  }
}

```

```

{
  "data": {
    "note": {
      "title": "test",
      "content": "# create\n\n# test",
      "id": "5dcc655b86d69d20ba3aecbd"
    }
  }
}

```

```

{
  notes {
    title
    content
    id
  }
}

```

```

{
  "data": {
    "notes": [
      {
        "title": "New Note",
        "content": "#Test\n\n## test2\n\n\nSome notes \n\n- bullet points\n\n-\n\n*words*\n",
        "id": "5dc713b9ed703c68a8058ed6"
      },
      {
        "title": "test",
        "content": "# create\n\n# test",
        "id": "5dcc655b86d69d20ba3aecbd"
      },
      {
        "title": "test create",
        "content": "3 test",
        "id": "5dcc676654e636224ac3e4e6"
      },
      {
        "title": "test",
        "content": "test\n\n# test",
        "id": "5dcc67c954e636224ac3e4e7"
      },
      {
        "title": "test",
        "content": "test test",
        "id": "5dcc68804dc320233b884126"
      }
    ]
  }
}

```

## REST

The back-end also contains REST routes.

```js

// Create
noteRoutes.route('/').post(function(req, res) {
    let note = new Note(req.body);
    note.save()
        .then(note => {
            console.log(`Created note with id: ${note.id}`);
            res.status(200).json(note);
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Error: Adding new note failed');
        });
});

// Read all
noteRoutes.route('/').get(function(req, res) {
    Note.find({}, function(err, notes) {
        if (err) {
            console.error(err);
            res.status(400).send('Error: Retrieving notes failed');
        } else {
            console.log(notes);
            console.log(
                'Returning notes with ids: \n',
                notes.map(note => note.id)
            );
            res.json(notes);
        }
    });
});

// Read one
noteRoutes.route('/:id').get(function(req, res) {
    const { id } = req.params;
    Note.findById(id, function(err, note) {
        if (err) {
            console.error(err);
            res.status(400).send(`Error: Retrieving note ${id} failed`);
        } else {
            console.log(`Returning note with id: ${note.id}`);
            res.json(note);
        }
    });
});

// Update
noteRoutes.route('/:id').put(function(req, res) {
    const { id } = req.params;
    console.log(id);
    if (mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Attempting to update note with id: ${id}`);
        Note.findById(id, function(err, note) {
            const { title, content } = req.body;
            if (!note) {
                console.error(err);
                res.status(404).send(`Error: Note ${id} cannot be found`);
            } else {
                note.title = title;
                note.content = content;
                console.log(`Saving note with id: ${note.id}...`);
                note.save()
                    .then(note => {
                        console.log(`Saved note with id: ${note.id}.`);
                        res.json(note);
                    })
                    .catch(err => {
                        res.status(400).send(
                            `Error: Update of note ${req.params.id} failed`
                        );
                    });
            }
        });
    } else {
        console.log('Attempted to save with invalid ID');
    }
});

// Delete
noteRoutes.route('/:id').delete(function(req, res) {
    console.log(req)
    const id = req.params.id;
    console.log(`Deleting note with id: ${id}...`);
    Note.findByIdAndDelete(id, function(err, note) {
        if (!note) {
            res.status(400).send(`Error: Deleting note ${id} failed`);
        } else {
            console.log(`Deleted note with id: ${note.id}.`);
            res.status(200).json(note);
        }
    });
});

```


The front-end uses axios for HTTP requests to the backend,

```js

export const getNote = id => {
    console.log(`Called getNote API call with id: ${id}.`);
    return axios.get(`${notesURL}/${id}`);
};

export const getAllNotes = () => {
    console.log('Called getAllNotes API call.');
    return axios.get(notesURL);
};

export const createNote = note => {
    console.log(`Called createNote API call with note: ${note}.`);
    return axios.post(notesURL, note);
};

export const updateNote = note => {
    console.log(`Called updateNote API call with id: ${note._id}.`);
    return axios.put(`${notesURL}/${note._id}`, note);
};

export const deleteNote = id => {
    console.log(`Called deleteNote API call with id: ${id}.`);
    return axios.delete(`${notesURL}/${id}`);
};

```

and React Hooks to handle fetching data.

```js

    // Get all notes on initial render;
    useEffect(() => {
        setLoading(true);
        getAllNotes().then(resp => {
            setNotes(resp.data);
            if (resp.data && resp.data[0]) {
                const firstNote = resp.data[0];
                setCurrentContent(firstNote.content);
                setCurrentTitle(firstNote.title);
            }
            setLoading(false);
        });
    }, []);

```

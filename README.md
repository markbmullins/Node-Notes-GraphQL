# Node-Notes

## About  

A MERN markdown note taking app that is build on React, Express, Node and 
MongoDB. It can handle CRUD operations with REST or GraphQL.

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

Schema:

```js

`
      type Note {
        id: ID
        title: String
        content: String
      }

      type Query {
          getNote(id: ID!): Note
          getNotes: [Note]
      }

      type Mutation {
          createNote(title: String!, content: String): Note
          updateNote(id: ID!, title: String!, content: String): Note
          deleteNote(id: ID!): Boolean
      }
  `

```

Resolvers:

```js

    getNotes: noteService.getAll(),
    getNote: ({id}) => noteService.getByID(id),
    createNote: ({title, content}) => noteService.create(title, content).then(note => note),
    updateNote: ({id, title, content}) => noteService.update(id, title, content).then(note => note),
    deleteNote: ({id}) => noteService.deleteById(id).then(note => note ? true : false)

```

Example queries and return data:

```js

{
  note(id:"5dcc655b86d69d20ba3aecbd") {
    title
    content
    id
  }
}

```

```js

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

```js

{
  notes {
    title
    content
    id
  }
}

```

```js

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
router.route('/').post(function(req, res) {
    const note = req.body;
    noteService
        .create(note)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Read all
router.route('/').get(function(req, res) {
    noteService
        .getAll()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Read one
router.route('/:id').get(function(req, res) {
    const { id } = req.params;
    noteService
        .getByID(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Update
router.route('/:id').put(function(req, res) {
    const note = req.body;
    noteService
        .update(note)
        .then(note => {
            res.json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

// Delete
router.route('/:id').delete(function(req, res) {
    const { id } = req.params;
    noteService
        .deleteById(id)
        .then(note => {
            res.status(200).json(note);
        })
        .catch(err => {
            handleError(res, err);
        });
});

```


Service Layer:

The service layer sits between the controllers and the Note repository. Create
and update can accept either a note object or individual note properties.


```js

const create = (...args) => {
    if(!args || args.length === 0) return null;
    if(args.length === 1) return noteRepository.create(args[0]);
    if(args.length === 2) return noteRepository.create({title: args[0], content: args[1]});
};

const getAll = () => {
    return noteRepository.getAll();
};

const getByID = id => {
    return noteRepository.getByID(id);
};

const update = (...args) => {
    if(!args || args.length === 0) return null;
    if(args.length === 1) return noteRepository.update(args[0]);
    if(args.length === 3) return noteRepository.update({_id: args[0], title: args[1], content:args[2]});
};

const deleteById = id => {
    return noteRepository.deleteById(id);
};

const validateId = id => {
    return noteRepository.validateId(id);
};

```

Repository Layer:

The repository layer handles Mongoose queries and returns promises using `.exec()`

```js

const create = note => {
    let noteObj = new Note(note);
    return noteObj.save();
};

const getAll = () => {
    return Note.find({}).exec();
};

const getByID = id => {
    return Note.findById(id).exec();
};

const update = note => {
    const { title, content } = note;
    return Note.findById(note._id)
        .exec()
        .then(note => {
            note.title = title;
            note.content = content;
            return note.save();
        });
};

const deleteById = id => {
    return Note.findByIdAndDelete(id).exec();
};

const validateId = id => {
    return mongoose.Types.ObjectId.isValid(id);
};

```

The mongoose schema contains the note title and content.

```js

let Note = new Schema({
    title: String,
    content: String
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

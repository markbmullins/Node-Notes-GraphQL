# Node-Notes

## About  

A MERN markdown note taking app that is build on React, Express, Node and 
MongoDB. It can handle CRUD operations with REST or GraphQL.

It has three panels, a notes panel in which you can select or delete notes, or
create new notes, an editing panel where you can edit the title and content of
the currently selected note, and save your updates, and a markdown rendering
panel where you can see how your note looks when parsed.


![Demo gif](./demo.gif)

***

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


***

## GraphQL  

### Schema

```js

const schema = buildSchema(`
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
  `);

```

### Resolvers

```js

    getNotes: noteService.getAll(),
    getNote: ({id}) => noteService.getByID(id),
    createNote: ({title, content}) => noteService.create(title, content).then(note => note),
    updateNote: ({id, title, content}) => noteService.update(id, title, content).then(note => note),
    deleteNote: ({id}) => noteService.deleteById(id).then(note => note ? true : false)

```

### Example queries and returns

Read one: 

```js

{
  getNote(id: "5dc713b9ed703c68a8058ed6") {
    title
    content
    id
  }
}


```

```js

{
  "data": {
    "getNote": {
      "title": "New Note",
      "content": "#Test\n\n## test2\n\n\nSome notes \n\n- bullet points\n\n-\n\n*words*\n",
      "id": "5dc713b9ed703c68a8058ed6"
    }
  }
}

```

Read all:

```js

{
  getNotes {
    title
    content
    id
  }
}

```

```js

{
  "data": {
    "getNotes": [
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

Create Note:

```js

mutation {
  createNote(title: "Testing a created note", content: "# test content \n -some content") {
    title
    content
    id
  }
}

```

```js

{
  "data": {
    "createNote": {
      "title": "Testing a created note",
      "content": "# test content \n -some content",
      "id": "5dd02f31fbb4b756e84d2e1d"
    }
  }
}

```

Update note:

```js

mutation {
  updateNote(id: "5dd02f31fbb4b756e84d2e1d", title: "Testing an update", content: "# test content \n -some content \n -updated") {
    title
    content
    id
  }
}

```

```js

{
  "data": {
    "updateNote": {
      "title": "Testing an update",
      "content": "# test content \n -some content \n -updated",
      "id": "5dd02f31fbb4b756e84d2e1d"
    }
  }
}

```

Delete note:

```js

mutation {
  deleteNote(id: "5dd02f31fbb4b756e84d2e1d")
}


```

```js

{
  "data": {
    "deleteNote": true
  }
}

```

***

### Apollo GraphQL


Front end queries:

```

export const GET_NOTES = gql`
    {
        getNotes {
            title
            content
            id
        }
    }
`;

```

This query accepts a [variable](https://graphql.org/learn/queries/#variables) of
type ID that is required, which matches the query definition in the schema,
`getNote(id: ID!): Note`. It has an
[operation name](https://graphql.org/learn/queries/#operation-name) of 
GetSingleNoteByID, which is a meaningful and explicit name for the operation,
which is only required in multi-operation documents, but its use is encouraged 
because it is very helpful for debugging and server-side logging. It has an
operation type of `query` and returns the fields `title` and `content` from the
Note type.

```

export const GET_NOTE = gql`
    query GetSingleNoteByID($id: ID!) {
        getNote(id: $id) {
            title
            content
        }
    }
`;

```

Note type:

```

      type Note {
        id: ID
        title: String
        content: String
      }

```

![GraphQL demo gif](./graphqldemo.gif)

***

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

## Back-end Architecture

The back end consists of three layers. A controller with HTTP endpoints, a
service layer which can contain logic to modify the queries/return data, and a
repository layer to handle database queries.

HTTP Request --> Controller --> Service --> Repository --> MongoDB

### Service Layer:

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

### Repository Layer:

The repository layer handles Mongoose queries and returns
promises using `.exec()`

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

## Front-end architecture
The front-end handles HTTP REST requests with Axios,

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

and React Hooks to handle fetching data from the REST endpoints.

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

For GraphQL requests, it uses 
[Apollo React Hooks](https://www.apollographql.com/docs/react/api/react-hooks/).
To get all notes, the hook `useQuery` is used.

```js
    const { loading, error, data } = useQuery(GET_NOTES);
```


For creating, updating or deleting notes, the `useMutation` hook is used.

```js
    const [updateNoteMutation] = useMutation(UPDATE_NOTE);

   
    const [createNoteMutation] = useMutation(CREATE_NOTE, {
        update(cache, { data: { createNote } }) {
            updateCache(cache, createNote, (a, b) => [...a, b]);
        }
    });
    const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
        update(cache, { data: { deleteNote } }) {
            updateCache(cache, deleteNote, (a, b) => a.filter(a => a.id !== b));
        }
    });
```

A helper function `updateCache` handles updating the Apollo cache with a given
filter function. To add to the list of notes, array 
[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
is used, and to remove the note, the array is [filtered](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) by `id`.

```js
 const updateCache = (cache, newNote, filterFunction) => {
        const { getNotes: notes } = cache.readQuery({ query: GET_NOTES });
        cache.writeQuery({
            query: GET_NOTES,
            data: { getNotes: filterFunction(notes, newNote) }
        });
        setSelectedNote(newNote);
    };
```

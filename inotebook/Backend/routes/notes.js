const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// Route 1==> fetch all notes of user using GET request Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error ");
  }
});

// Route 2==> Add note in user using POST request Login required

router.post('/addnote',fetchuser,[
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // if there are error ,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,description,tag,user: req.user.id
      });

      const savednote = await note.save();
      res.json(savednote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error ");
    }
  }
);

// Route 3==> update a note in user using PuT request Login required

router.put('/updatenote/:id',fetchuser,
  async (req, res) => {

    const{title,description,tag}= req.body;

    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //find the note to be updated and update it

    let note= await Note.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not found")
    }

    //for checking the user 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})

    res.json({note});

  })

// Route 4==> Delete a note in user using PuT request Login required

router.delete('/deletenote/:id',fetchuser,
  async (req, res) => {

    let note= await Note.findById(req.params.id);

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }

    note=await Note.findByIdAndDelete(req.params.id)

    res.json("deleted Sucessfuly")

  })

module.exports = router;

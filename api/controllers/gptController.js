const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI }  = require('openai');

require('dotenv').config();

const openai_key = new OpenAI({
  apiKey: process.env.GPTAPI // This is also the default, can be omitted
});


const GetSuggestions  = async (req, res) => {
  const suggestion = req.params;
  console.log(req.params)  
  
  try {
    const completion = await openai_key.completions.create({
      model: "text-davinci-003",
      prompt: "Give me a full todo list for traveling to japan"
      ,
      max_tokens: 256,
      temperature: 0.3,
    });
    const sentences = completion.choices[0].text.split('\n');
    console.log(completion);
    return res.status(200).json({
      success: true,
      data: sentences
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
        success: false,
        error: error.response ? error.response.data : "There was a server issue."
    })
  } 
}

module.exports = { GetSuggestions } 
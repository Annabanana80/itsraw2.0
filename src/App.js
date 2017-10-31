import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import ModalFooter from 'react-bootstrap/lib/ModalFooter'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Image from 'react-bootstrap/lib/Image'
import Navbar from 'react-bootstrap/lib/Navbar'
import InputGroup from 'react-bootstrap/lib/InputGroup'
class App extends Component {

state={
  recipes:[
  {recipeName: 'Rainbow Icecream', ingredients: ['Cream', 'Sugar','Unicorn Magic','Sparkles'], instructions: ['Make ice cream', 'Add some sparkles', 'Ta-da! Ice cream!'], picture: ['http://cake.style/wp-content/uploads/2016/04/Rainbow-Ice-cream-Cookies-2-1024x683.jpg']},
  {recipeName: 'Piecaken', ingredients: ['Pie','Cake Mix','Frosting'], instructions: ['Cook pie according to instructions','Pour half of cake mix into cake pans', 'Carefully insert pie upside down','Bake', 'Cool then frost'], picture: ['https://i.imgur.com/RgmOkZ3m.jpg']}


  ],
  showAdd:false,
  showEdit:false,
  currentIndex: 0,
  newestRecipe: {recipeName:'', ingredients:[], instructions:[], picture: ""},
  
  
}
//deletes a recipe
deleteRecipe(index){
    let recipes= this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes',JSON.stringify(recipes));
    this.setState({recipes});
  }

//Add a newestRecipe
addNewRecipe(recipeName, ingredients,instructions, picture){
  this.setState({newestRecipe:{recipeName: recipeName, ingredients:ingredients, instructions:instructions, picture:picture}});
}


//Saves new recipe
saveNewRecipe(){
  let recipes = this.state.recipes.slice();
  recipes.push({recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients, instructions: this.state.newestRecipe.instructions, picture: this.state.newestRecipe.picture});
  // localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
  this.setState({newestRecipe: {recipeName:"",ingredients:[], instructions:[], picture:""}});
  this.close();
}
//closes a modal
close =() =>{
  if(this.state.showAdd){
    this.setState({showAdd: false})
  }if(this.state.showEdit){
    this.setState({showEdit:false})
  }
}
//open a modal
open = (state, currentIndex)=>{
  this.setState({[state]:true});
  this.setState({currentIndex});
}
//updates recipe name
updateRecipeName(recipeName, currentIndex){
  let recipes = this.state.recipes.slice();
  recipes[currentIndex]={recipeName:recipeName, ingredients: recipes[currentIndex].ingredients};
  this.setState({recipes});
}
//updates ingredients
updateIngredients(ingredients,currentIndex){
  let recipes = this.state.recipes.slice();
  recipes[currentIndex]={recipeName:recipes[currentIndex].recipeName, ingredients: ingredients};
  // localStorage.setItem('recipes',JSON.stringify(recipes));
  this.setState({recipes});
} 

// componentDidMount(){
//   let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
//   localStorage.setItem('recipes',JSON.stringify(recipes));
//   this.setState({recipes});

// } 



  render() {
   const{recipes, newestRecipe, currentIndex} = this.state;
   
    return (
      <div className="App">
        <Jumbotron>
          <h1>It's Raw!!</h1>
        <p>A Gordon Ramsey themed recipe saver app.</p>
        <p><Button bsStyle="danger" onClick={(event)=>this.open("showAdd", currentIndex)}>Add Recipe</Button></p>
        </Jumbotron>
        <div className="container-fluid" style ={ { backgroundImage: "url('https://i.imgur.com/t51f3J2l.jpg')" } }>
        <div className="container">
        
        {recipes.length>0 &&(
        <div>
        <Accordion>
          {recipes.map((recipe, index)=>(
            <Panel header={recipe.recipeName}eventKey={index} key= {index}>
            <Grid>
              <Row className="show-grid">
              <Col xs={6} md={6} id="picture">                
                <Image src={recipe.picture} className="thumbnail"/>              
              </Col>  
              <Col xs={6} md={6} id="ingCont">
              <h3 id="ingredients">Ingredients</h3> 
                <div>              
                  <ol>
                    {recipe.ingredients.map((item)=>
                      <li key={item}>{item}</li>
                      )}
                  </ol> 
                </div>                
                </Col>
                </Row>
              </Grid>
                <h3 id="instructions">Instructions</h3> 
              <div> 
                <ol>
                {recipe.instructions.map((item)=>
                  <li key={item}>{item}</li>
                  )}
                </ol>
              </div>                              
                               
              <ButtonToolbar>
                <Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(currentIndex)}>Shut it down!!(Delete Recipe)</Button>
                <Button bsStyle="info" onClick={(event)=>this.open("showEdit",index)}>Donkey!!(Edit Recipe)</Button>
              </ButtonToolbar>
            </Panel>
          ))}

        </Accordion>
      
<Modal show={this.state.showEdit} onHide={this.close}>
  <Modal.Header closeButton>
    <Modal.Title>Add Recipe</Modal.Title>
    <Modal.Body>

      <FormGroup controlId="formBasicText">
        <ControlLabel>Recipe Name</ControlLabel>
        <FormControl
          type="text"
          value={recipes[currentIndex].recipeName}
          placeholder="Enter Recipe Name"
          onChange={(event)=>this.updateRecipeName(event.target.value,currentIndex)}
          ></FormControl>      
      </FormGroup>

      
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Ingredients</ControlLabel>
        <FormControl
          componentClass="textarea"
          value={recipes[currentIndex].ingredients}
          placeholder="Enter measurements then ingredients. Separate by commas."
          onChange={(event)=>this.updateIngredients(event.target.value.split(","),currentIndex)}
          ></FormControl>
      </FormGroup>      
    </Modal.Body>
    <ModalFooter>
      <Button onClick={(event)=>this.saveNewRecipe(newestRecipe)}>Save</Button>
    </ModalFooter>
  </Modal.Header>
</Modal>
</div>
)}
<Modal show={this.state.showAdd} onHide={this.close}>
  <Modal.Header closeButton>
    <Modal.Title>Add Recipe</Modal.Title>
    <Modal.Body>

      <FormGroup controlId="formBasicText">
        <ControlLabel>Recipe Name</ControlLabel>
        <FormControl
          type="text"
          value={newestRecipe.recipeName}
          placeholder="Enter Recipe Name"
          onChange={(event)=>this.addNewRecipe(event.target.value, newestRecipe.ingredients)}
          ></FormControl>      
      </FormGroup>

      
      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Ingredients</ControlLabel>
        <FormControl
          type="textarea"
          value={newestRecipe.ingredients}
          placeholder="Enter measurements then ingredients. Separate by commas."
          onChange={(event)=>this.addNewRecipe(newestRecipe.recipeName, event.target.value.split(","))}
          ></FormControl>
      </FormGroup>      
    </Modal.Body>
    <ModalFooter>
      <Button onClick={(event)=>this.saveNewRecipe(newestRecipe)}>Save</Button>
    </ModalFooter>
  </Modal.Header>
</Modal>


    </div>
    </div>
      <Navbar className="fixedBottom">
        <Navbar.Header>
          <Navbar.Brand>
          <h5>Made By Anna Sanderson</h5>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      </div>

    );
  }
}

export default App;

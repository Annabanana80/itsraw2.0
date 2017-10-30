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
import Clearfix from 'react-bootstrap/lib/Clearfix'
import Navbar from 'react-bootstrap/lib/Navbar'
class App extends Component {

state={
  recipes:[
  {recipeName: 'Rainbow Icecream', ingredients: ['Cream', 'Sugar','Unicorn Magic','Sparkles'], instructions: ['Make ice cream', 'Add some sparkles', 'Ta-da! Ice cream!'], picture: 'https://i.imgur.com/lyzbm9Rt.jpg'}


  ],
  // showAdd:false;
  // showEdit:false,
  // currentIndex:0;
  // newestRecipe: {recipeName:"", ingredients[],instructions[],}
}


  render() {
   const{recipes} = this.state;
    return (
      <div className="App">
        <Jumbotron>
          <h1>It's Raw!!</h1>
        <p>A Gordon Ramsey themed recipe saver app.</p>
        <p><Button bsStyle="danger">Add Recipe</Button></p>
        </Jumbotron>
        <div className="container-fluid" style ={ { backgroundImage: "url('https://i.imgur.com/t51f3J2l.jpg')" } }>
        <div className="container">
        <Accordion>
          {recipes.map((recipe, index)=>(
            <Panel header={recipe.recipeName}eventKey={index} key= {index}>
            <Grid>
              <Row className="show-grid">
              <Col xs={6} md={6}>
              {recipes.map((pic)=>
                <Image src={recipe.picture} className="thumbnail"/>
              )}
              </Col>  
              <Col xs={6} md={6}>
              <h1>Ingredients</h1>

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
                <h1>Instructions</h1>
 
              <div>
                <ol>
                {recipe.instructions.map((item)=>
                  <li key={item}>{item}</li>
                  )}
                </ol>
              </div>
              <ButtonToolbar>
                <Button bsStyle="danger">Shut it down!!(Delete Recipe)</Button>
                <Button bsStyle="info">Donkey!!(Edit Recipe)</Button>
              </ButtonToolbar>
            

            </Panel>
          ))}

        </Accordion>
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

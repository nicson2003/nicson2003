import React, { useState, useEffect} from 'react';
import { Header, Grid, Segment, Divider, Container, Button, Icon } from 'semantic-ui-react'
import { Menus } from "../common/menu.interface";
import menuData from "../common/data.json";
import MenuGroups from "./MenuGroups";

import '../App.css';

const MenuForm = () => {

  const [selectedFirstGroup, setSelectedFirstGroup] = useState<Menus>();
  const [selectedSecondGroup, setSelectedSecondGroup] = useState<Menus | undefined>();
  const [selectedThirdGroup, setSelectedThirdGroup] = useState<Menus | undefined>();
  const [selectedMenu, setSelectedMenu] = useState<Menus>();
  const [rules, setRules] = useState<Number[]>();
  const firstGroups = menuData.menus[0];
  const secondGroups = menuData.menus[1];
  const thirdGroups = menuData.menus[2];


  useEffect(() => {
    //console.log("testing changes", selectedMenu, rules)
  }, [selectedMenu])

  useEffect(() => {
    //reset second/third group selection
    setSelectedSecondGroup(undefined)
    setSelectedThirdGroup(undefined)
  }, [selectedFirstGroup])


  const handleChange = (e: Menus | any, opt: number) => {
    setRules(menuData.rules[e.id.toString()])
    setSelectedMenu(e);

    switch (opt) {
      case 0:
        setSelectedFirstGroup(e)
        break;
      case 1:
        setSelectedSecondGroup(e)
        break;
      case 2:
        setSelectedThirdGroup(e)
        break;
      default:
        break;
    }
  } 

  return(
    <Container>
        <Divider horizontal>
        </Divider>
        <Header as='h3' content='Customize your meal' textAlign='center' />
        <Divider horizontal>
        </Divider>
        <Segment>
       <Grid columns='three' doubling>
        <Grid.Column>
          { firstGroups && <MenuGroups groups={firstGroups} onChange={handleChange} opt={0} rules={rules} /> }          
        </Grid.Column>
        <Grid.Column>
          <MenuGroups groups={secondGroups} onChange={handleChange} opt={1} rules={rules} preSelection={selectedFirstGroup}/>
        </Grid.Column>
        <Grid.Column>
          <MenuGroups groups={thirdGroups} onChange={handleChange} opt={2} rules={rules} preSelection={selectedSecondGroup}/>
        </Grid.Column>
      </Grid>
         <Divider horizontal>
         </Divider>
        <Button animated='vertical' disabled={!Boolean(selectedThirdGroup) || !Boolean(selectedSecondGroup)}>
          <Button.Content hidden>Submit order</Button.Content>
          <Button.Content visible>$10 only</Button.Content>
        </Button>
      </Segment>
    </Container>
  );
}

export default MenuForm;

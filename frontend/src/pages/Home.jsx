import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import MessageForm from '../components/MessageForm';
import Departments from '../components/Departments';

const Home = () => {
  return (
    <>
    <Hero title={"Welcome To ZeeCare Medical Institute"} imageUrl={"/hero.png"}/>
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>
  )
}

export default Home

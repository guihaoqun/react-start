import React from 'react'
import TestImage from '../assets/test.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='测试文件'
      className='test'
      src={TestImage} />
  </div>
)

export default HomeView
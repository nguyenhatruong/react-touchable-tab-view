import React from 'react'
import { storiesOf } from '@storybook/react'

import { TouchableTabview } from '../components/TouchableTabview'

const stories = storiesOf('Touchable Test', module)

stories.add('App', () => {
  return (
    <TouchableTabview
      renderTabBar={({ tabs, onChangeTab }) => (
        <div>
          {tabs.map((tab, tabIndex) => (
            <span style={{ marginLeft: 10 }} onClick={() => onChangeTab(tabIndex)}>{tab.label}</span>
          ))}
        </div>
      )}
    >
      <div tabLabel='Incom'>
        <p>Income</p>
      </div>
      <div tabLabel='History'>
        <p>History</p>
      </div>
    </TouchableTabview>
  )
})
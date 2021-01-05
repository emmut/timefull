import React from 'react'

export function App() {
  return (
    <div>
      <h1>This is a function component</h1>
      <button onClick={() => {
          electron.notificationApi.sendNotification({title: "Pause", body: "It's time to pause"});
      }}>Notify</button>
    </div>
  )
}

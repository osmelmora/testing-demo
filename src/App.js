import { useState } from 'react';
import useSWR, { mutate } from 'swr';

function App() {
  const [text, setText] = useState('')
  const { data: list, postUser } = useUserList();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name: text };
    await postUser(newUser);

    setText('');
  }

  return (
    <main style={{ maxWidth: 500, margin: '0 auto', marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="userName" value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list?.map(({ name }, index) => <li key={index}>{name}</li>)}
      </ul>
    </main>
  );
}

export default App;


function useUserList() {
  const requestData = useRequest('/list');
  
  const postUser = async (newUser) => {
    await request('/list', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })

    mutate('/list');
  }

  return { ...requestData, postUser };
}

function useRequest(...args) {
  return useSWR(...args, request)
}

async function request(...args) {
  const res = await fetch(...args)
  return res.json()
}

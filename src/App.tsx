import {useState} from 'react'
import './App.css'
import logo from './logo.svg'

function App() {
  interface IData {
    name: string
    aspek_penilaian_1: number
    aspek_penilaian_2: number
    aspek_penilaian_3: number
    aspek_penilaian_4: number
  }

  const _data: IData[] = Array.from({length: 10}, (_, i) => ({
    name: `Mahasiswa ${i + 1}`,
    aspek_penilaian_1: 1,
    aspek_penilaian_2: 1,
    aspek_penilaian_3: 1,
    aspek_penilaian_4: 1,
  }))

  const [state, setState] = useState(_data)
  const [loading, setLoading] = useState(false)

  const handleChange =
    (field: number, aspekNilai: string) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      let tempArray = [...state]
      const value = parseInt(event.target.value)
      tempArray[field] = {
        ...tempArray[field],
        [aspekNilai]: value,
      }

      setState(tempArray)
    }

  const onSubmit = () => {
    setLoading(true)
    let newState: {[key: string]: any} = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {},
    }
    state.forEach((res: {[key: string]: any}) => {
      const replacedName = res.name.replace(' ', '_').toLocaleLowerCase()
      for (let i = 0; i < 4; i++) {
        newState[`aspek_penilaian_${i + 1}`] = {
          ...newState[`aspek_penilaian_${i + 1}`],
          [replacedName]: res[`aspek_penilaian_${i + 1}`],
        }
      }
    })

    setTimeout(() => {
      console.log(newState)

      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(newState),
      )}`
      const link = document.createElement('a')
      link.href = jsonString
      link.download = 'data.json'

      link.click()
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Aplikasi Penilaian Mahasiswa</p>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Aspek penilaian 1</th>
                <th>Aspek penilaian 2</th>
                <th>Aspek penilaian 3</th>
                <th>Aspek penilaian 4</th>
              </tr>
            </thead>
            <tbody>
              {state.map((res, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="name-container">
                        <img
                          className="avatar"
                          src={`https://picsum.photos/id/40${i}/40`}
                          alt="avatar"
                        />
                        {res.name}
                      </div>
                    </td>
                    {Array.from({length: 4}, (_, idx) => (
                      <td key={`aspek-${idx}`}>
                        <select
                          value={
                            res[`aspek_penilaian_${idx + 1}` as keyof IData]
                          }
                          onChange={handleChange(
                            i,
                            `aspek_penilaian_${idx + 1}`,
                          )}
                          className="select"
                        >
                          {Array.from({length: 10}, (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="name-container ">
          <button className="submit" onClick={onSubmit} disabled={loading}>
            Simpan
          </button>{' '}
          {loading && (
            <>
              <img src={logo} className="App-logo" alt="logo" />
              loading..
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default App

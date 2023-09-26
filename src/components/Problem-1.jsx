import {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [formData, setFormData] = useState({name: '', status: ''});
    // const [name, setName] = useState('');
    // const [status, setStatus] = useState('');
    const [items, setItems] = useState([]);

    
    // console.log(formData);
    
    const handleClick = (val) =>{
      setShow(val);
    }
    // *********** [name]: value
    const handleChange = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = e => {
      e.preventDefault();
      setItems([ ...items, formData ]);
      setFormData({name: '', status: ''});
    }

    /* const filterItems = () => {
        if (show === 'active') {
            return items.filter(item => item.status.toLowerCase() === 'active')
        } else if(show === 'completed') {
            return items.filter(item => item.status.toLowerCase() === 'completed')
        } return items;
    } */
    
    const filterItems = () => {
      const activeItems = items.filter(item => item.status.toLowerCase() === 'active');
      const completedItems = items.filter(item => item.status.toLowerCase() === 'completed');
      const otherItems = items.filter(item => item.status.toLowerCase() !== 'active' && item.status.toLowerCase() !== 'completed');

      // return [...activeItems, ...completedItems, ...otherItems];

      switch (show) {
        case 'active':
          return [...activeItems];
        case 'completed':
          return [...completedItems];    
        default:
          return [...activeItems, ...completedItems, ...otherItems];
      }
    };

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
          <div className="col-6 ">
            {/* ----------------------- Form ----------------------- */}
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Name" name='name' value={formData.name} onChange={handleChange} />
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Status" name='status' value={formData.status} onChange={handleChange} />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>

          <div className="col-8">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
              </li>
              <li className="nav-item">
                <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
              </li>
            </ul>
            <div className="tab-content"></div>

            <table className="table table-striped ">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              
              <tbody>
                {
                  filterItems().map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.status.toLowerCase()}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Problem1;
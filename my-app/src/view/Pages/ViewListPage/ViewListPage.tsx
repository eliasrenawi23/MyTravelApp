import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetOneTravel, UpdateInViwlist } from '../../../app/reducer/OneTravelReduser';
import { GetUser } from '../../../app/reducer/UserReducer';
import CollapsibleCompo from '../../components/CollapsibleCompo/CollapsibleCompo';
import './ViewListPage.scss'

interface category {
  CategoryName: string;
  listincat: Array<item>;
}

interface item {
  name: string;
  quantity: number;
}

const ViewListPage = () => {
  const listContent: Array<category> =
    [
      {
        CategoryName: "Essentials",
        listincat: [{ name: "Passport", quantity: 1 }, { name: "Mobile", quantity: 1 }, { name: "Wallet", quantity: 1 }, { name: "Coins", quantity: 1 }]
      },
      {
        CategoryName: "Clothes",
        listincat: [{ name: "Shirt", quantity: 6 }, { name: "Pants", quantity: 3 }, { name: "Underwear", quantity: 6 }]
      },
      {
        CategoryName: "Care",
        listincat: [{ name: "Conditioner", quantity: 1 }, { name: "Shampoo", quantity: 1 }, { name: "soap", quantity: 1 }, { name: "Tooth paser & brush", quantity: 1 }]
      },
      {
        CategoryName: "Accessories",
        listincat: [{ name: "Shoes", quantity: 1 }, { name: "Phone charger", quantity: 1 }, { name: "Earphones", quantity: 1 }, { name: "Cat cage", quantity: 1 }]
      }
    ];
  const [AddInput, setAddInput] = useState(false);
  const [NewCatgeName, setNewCatgeName] = useState("");
  const User = useAppSelector(GetUser);
  const nav = useNavigate();
  const { state }: any = useLocation();
  const dispatch = useAppDispatch();
  const OneTravel = useAppSelector(GetOneTravel);
  //const [usestatearrey, setusestatearrey] = useState(listContent);
  const [usestatearrey, setusestatearrey] = useState(OneTravel.OneTravelInfo.Listofcat);


  console.log(OneTravel.OneTravelInfo.Listofcat);
  console.log(listContent);
  console.log(usestatearrey);

  useEffect(() => {
    var date: String[] = OneTravel.OneTravelInfo.travelDateFrom.split('T');
    var header: String = OneTravel.OneTravelInfo.travelDest + ',' + date[0];
    dispatch(changeNavText(header));
  }, [dispatch]);
  useEffect(() => {
    
    (User.Islogin) ? setusestatearrey(OneTravel.OneTravelInfo.Listofcat) : setusestatearrey(listContent);
  }, [User]);

  function clickSignup(e: any) {
    nav('/Login', {
      state: state
    });

  }

  function addnewCategoryhandler(e: any) {
    setAddInput(!AddInput);
    console.log("add new category pressed")

    //listContent.push()
  }
  function pushNewToArraey(e: any) {
    console.log("pushNewToArraey")

    const newlistcat: category = {
      CategoryName: NewCatgeName,
      listincat: []
    }

    listContent.push(newlistcat)
    console.log(listContent)

    dispatch(UpdateInViwlist(listContent));

    //setusestatearrey(listContent);
    setNewCatgeName("");
    console.log(listContent)

  }

  function handelFindout(e: any) {
    nav('/SummeryPage', {
      state: state
    });
  }


  return (
    <div className='ViewListPageWorapper'>

      <div className="ListContainer">
        {usestatearrey.map((element, index) => {
          return (
            <CollapsibleCompo key={index} CategoryName={element.CategoryName} listincat={element.listincat} />
          );
        })}
      </div>

      {User.Islogin ?
        <div className='Addnewcategory' >
          <div className="cllabsediv" onClick={addnewCategoryhandler}>
            <CollapsibleCompo CategoryName={"⊕ Add new Category"} listincat={[]} />
          </div>
          {AddInput ?
            <div className='inputcontaINER'>
              <form>
                <label htmlFor="newcategory">Enter a Category name:</label>
                <input type="text" id="phone" name="newcategory" placeholder="new Category name" onChange={(e: any) => (setNewCatgeName(e.target.value))} />
                <input type="submit" onClick={pushNewToArraey}></input>
              </form>
            </div> : null}
          <button className='FindOutMoreBtn' onClick={handelFindout}>
            Find Out More...</button>
        </div> : <div className="notlist">
          <div className='congratMsgt'>
            <h1>Congrats!</h1>
            <p>to save/edit, plase sign up
            </p>
          </div>

          <button className='signUpbtn' onClick={clickSignup}>
            Free Sign up to save & edit</button>
          <div>

          </div>
        </div>}


    </div>
  )
}

export default ViewListPage;
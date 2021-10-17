import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { uuid } from "uuidv4";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategories = (e) => {
    //  setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
            productId: uuid(),
          };

          addProduct(product, dispatch);
          window.location.replace("/products");
        });
      }
    );
  };
  //  console.log(Object.keys(inputs).length);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product(Novi Proizvod)</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image(Slika)</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="file"
            required
          />
        </div>
        <div className="addProductItem">
          <label>Title(Ime Proizvoda)</label>
          <input
            name="title"
            type="text"
            placeholder="Ime mora bit unikatno"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price(Cijena Proizvoda)</label>
          <input
            name="price"
            type="number"
            placeholder="30"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Size(Velicina Proizvoda)</label>
          <input
            name="size"
            type="text"
            placeholder="upisi bez oznake 'cm'"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories(Kategorije Proizvoda)</label>
          <select
            onChange={(e) => setCategories(e.target.value)}
            defaultValue="Options"
            className="orderInfoValue"
          >
            <option value="Options" disabled>
              Odaberi Kategoriju
            </option>
            <option value="bowls">Peka</option>
            <option value="pots">Lonac</option>
            <option value="souvenirs">Suvenir</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Description(Opis)</label>
          <textarea
            type="text"
            placeholder="Peka je posuda koja moze..."
            onChange={handleChange}
            name="desc"
            required
            rows="5"
          ></textarea>
        </div>
        <div className="addProductItem">
          <label>Stock(Na Lageru)</label>
          <select onChange={handleChange} name="inStock" id="">
            <option value="true">Yes(Da)</option>
            <option value="false">No(Ne)</option>
          </select>
        </div>

        <button onClick={handleClick} className="addProductButton">
          Potvrdi
        </button>
      </form>
    </div>
  );
}

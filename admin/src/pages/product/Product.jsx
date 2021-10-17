import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Sijecanj",
      "Veljaca",
      "Ozujak",
      "Travanj",
      "Svibanj",
      "Lipanj",
      "Srpanj",
      "Kolovoz",
      "Rujan",
      "Listopad",
      "Studeni",
      "Prosinac",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(
          "/orders/income?pid=" + product.productId
        );
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (error) {}
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategories = (e) => {
    setCat(e.target.value.split(","));
  };

  //  console.log(product);
  const handleClick = (e) => {
    e.preventDefault();
    let productUpdate = {
      ...product,
      ...inputs,
      // categories: cat.length > 0 ? cat : product.categories,
    };
    let progress;

    if (file) {
      var url;
      const fileName = new Date().getTime() + file?.name;
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
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => (url = downloadURL)
          );
        }
      );
    }
    if (file) {
      setTimeout(() => {
        productUpdate.img = url;
        updateProduct(productUpdate, productId, dispatch);
        console.log(progress);
        formRef.current.reset();
      }, 2000);
    } else {
      updateProduct(productUpdate, productId, dispatch);
      formRef.current.reset();
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Proizvod</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Novi</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={pStats}
            dataKey="Sales"
            title="Sales Performance(Prodaja)"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span
                className="productInfoValue"
                style={{ marginLeft: "0.3em" }}
              >
                {product?._id}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Prodaja:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Aktivan:</span>
              <span className="productInfoValue">Da</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Na Lageru:</span>
              <span className="productInfoValue">
                {product?.inStock ? "Da" : "Ne"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form ref={formRef} className="productForm">
          <div className="productFormLeft">
            <label>Name (Ime Proizvoda)</label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder={product?.title}
            />
            <label>Description (Opis Proizvoda)</label>
            <textarea
              type="text"
              placeholder="Peka je posuda koja moze..."
              onChange={handleChange}
              name="desc"
              required
              rows="5"
            >
              {product?.desc}
            </textarea>
            <label>Price (Cijena Proizvoda)</label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              placeholder={product?.price}
            />
            <label>Size (Velicina Proizvoda)</label>
            <input
              name="size"
              onChange={handleChange}
              type="text"
              placeholder={product?.size}
            />
            <label>Category (Kategorija Proizvoda)</label>
            <select
              onChange={handleChange}
              defaultValue="Options"
              className="orderInfoValue"
              name="categories"
            >
              <option value="Options" disabled>
                {(product?.categories === "bowls" && "Peka") ||
                  (product?.categories === "pots" && "Lonac") ||
                  (product?.categories === "souvenirs" && "Suvenir")}
              </option>
              <option value="bowls">Peka</option>
              <option value="pots">Lonac</option>
              <option value="souvenirs">Suvenir</option>
            </select>
            <label>In Stock (Na Lageru)?</label>
            <select
              onChange={handleChange}
              defaultValue="Options"
              name="inStock"
              id="idStock"
            >
              <option value="Options" disabled>
                {product?.inStock ? "Da" : "Ne"}
              </option>
              <option value="true">Yes (Da)</option>
              <option value="false">No (Ne)</option>
            </select>
          </div>
          <div className="productFormRight">
            <div
              className="productUpload"
              style={{ flexDirection: "column", gap: "1em" }}
            >
              <img src={product?.img} alt="" className="productUploadImg" />
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="file"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button onClick={handleClick} className="productButton">
              Azuriraj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

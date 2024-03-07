import { useEffect, useState } from "react";

import { IoSearchCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";


import { CiCircleInfo } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

import { IoMdAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

import {
  ContainerCarrinho,
  ContainerImageCarousel,
  ContainerTamanhos,
  ContainerThumbs,
  HeaderInfo,
  ProductDetailHeaderContainer,
  TamanhoBox,
  TamanhoCircle
} from './ProductDetailsStyled';


function ProductDetail(products) {
  const allCategories = products.products.map(product => product.category_name);
  const removeCategorysDuplicates = () => {
    let categories = allCategories.filter((valor, indice, self) => {
      return self.indexOf(valor) === indice;
    });
    return categories;
  }

  var categoriesList = removeCategorysDuplicates();

  const [productSelected, setProductSelected] = useState(products.products[0]);
  const [categorySelected, setCategorySelected] = useState(categoriesList[0]);
  const [imageSelected, setImageSelected] = useState();
  const [showInformations, setShowInformations] = useState(false);
  const [showSearchByRef, setShowSearchByRef] = useState(false);
  var reference = "";
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    setProductSelected(products.products.filter(product => product.category_name === categorySelected)[0]);
  }, [categorySelected]);

  useEffect(() => {
    if (productSelected) {
      setImageSelected(productSelected?.images[0].image);
    }
  }, [productSelected]);

  const handleSetCategoryBack = () => {
    if (categorySelected === categoriesList[0]) {
      setCategorySelected(categoriesList[categoriesList.length - 1]);
    } else {
      let currentCategory = categoriesList.indexOf(categorySelected);
      setCategorySelected(categoriesList[currentCategory - 1]);
    }
  }

  const handleSetCategoryNext = () => {
    if (categorySelected === categoriesList[categoriesList.length - 1]) {
      setCategorySelected(categoriesList[0]);
    } else {
      let currentCategory = categoriesList.indexOf(categorySelected);
      setCategorySelected(categoriesList[currentCategory + 1]);
    }
  }

  const ProductDetailHeader = () => {
    return (
      <ProductDetailHeaderContainer >
        <IoIosArrowDropleft onClick={handleSetCategoryBack} />
        <label>{categorySelected}</label>
        <IoIosArrowDropright onClick={handleSetCategoryNext} />
      </ProductDetailHeaderContainer>
    )
  }

  const handleSetProductBack = () => {

    if (productSelected === products.products[0]) {
      console.log('products[products.length - 1]', products.products[products.products.length - 1]);

      setProductSelected(products.products[products.products.length - 1]);
      console.log('productSelected', productSelected);

    } else {
      let currentProduct = products.products.indexOf(productSelected);
      setProductSelected(products.products[currentProduct - 1]);
    }
  }

  const handleSetProductNext = () => {
    if (productSelected === products?.products[products?.products.length - 1]) {
      setProductSelected(products.products[0]);
    }
    else {
      let currentProduct = products.products.indexOf(productSelected);
      setProductSelected(products.products[currentProduct + 1]);
    }
  }

  const handleSetImageSelected = (event) => {
    event.preventDefault();
    setImageSelected(event.target.src);
  }

  const handleToggleShowInformations = () => {
    setShowInformations(!showInformations);
  }

  const handleToggleShowSearchByRef = () => {
    setShowSearchByRef(!showSearchByRef);
  }

  const handleChangeSearchByRef = (event) => {
    event.preventDefault();
    reference = event.target.value;
  }

  const handleSearchByRef = (event) => {
    event.preventDefault();
    handleToggleShowSearchByRef();
    setProductSelected(products.products.filter(product => product.reference === reference)[0]);
  }

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleQuantidadeChange = (event) => {
    const newQuantidade = parseInt(event.target.value, 10);
    setQuantidade(isNaN(newQuantidade) ? 0 : newQuantidade);
  };

  function ProductSizes({ product }) {
    return (
      <ContainerTamanhos>
        {Object.entries(product.sizes).map(([size, quantity]) => (
          <TamanhoBox key={size}>
            <TamanhoCircle>
              <span>{size}</span>
            </TamanhoCircle >
            <span>{quantity}</span>
          </TamanhoBox>
        ))}
      </ContainerTamanhos>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '380px', height: '600px' }}>
      <ProductDetailHeader />

      <Carrossel />
    </div>
  );

  function Carrossel() {
    const RenderImages = () => {
      let imagesElements = [];
      productSelected?.images.map((image, index) => {
        imagesElements.push(
          <ContainerThumbs>
            <img
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #7f7c7c',
                borderRadius: '2px',
                margin: '2px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease'
              }}
              src={image.image}
              key={index}
              alt={productSelected.name}
              onClick={handleSetImageSelected}
            />
            <hr style={{ width: '80%', color: 'red' }}></hr>
          </ContainerThumbs>
        )
      });

      return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {imagesElements}
        </div>
      )
    }


    //////------------Modal Info---------------------------
    const RenderInformations = () => {
      if (!showInformations) {
        return null;
      }
      console.log('productSelected.colors', productSelected);

      let colors = [];
      productSelected.colors?.map((color, index) => {
        colors.push(<label key={index}>{color.color_name}</label>);
      });

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          backgroundColor: 'white',
          height: '80%',
          width: '80%',
          borderRadius: '15px',
          borderWidth: '2px',
          border: 'black'
        }}>
          <HeaderInfo>
            Informações
            <MdCancel style={{ cursor: 'pointer', position: 'absolute', right: '0' }} onClick={handleToggleShowInformations} />
          </HeaderInfo>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
            <span>Nome do produto: {productSelected?.name}</span>
            <span>Referência: {productSelected?.reference}</span>
            <span>Marca: {productSelected?.brand_name}</span>
            <span>Categoria: {productSelected?.category_name}</span>
            <span>Gênero: {productSelected?.group_name}</span>
          </div>
        </div>
      );
    }
    /////----------Busca REF---------------------
    const RenderSearchByRef = () => {
      if (!showSearchByRef) {
        return null;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          backgroundColor: 'white',
          height: '80%',
          width: '80%',
          borderRadius: '15px',
          borderWidth: '1px',
          border: 'black'
        }}>
          <header style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'rgb(141, 166, 189)'
          }}>

            Busca por REF
            <MdCancel style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '0'
            }}
              onClick={handleToggleShowSearchByRef}
            />
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
            <input onChange={handleChangeSearchByRef}></input>
            <button onClick={handleSearchByRef}>Buscar</button>
          </div>
        </div>
      );
    }

    return (

      <>
        <ContainerImageCarousel style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',

        }
        }>
          <div>
            <RenderInformations style={{ cursor: "pointer", fontSize: "30px" }} />
            <RenderSearchByRef style={{ cursor: "pointer", fontSize: "50px" }} />

            <img
              style={{ height: '300px' }}
              src={imageSelected}
              alt="Descrição da imagem" />


          </div>

          <IoIosArrowDropleft
            style={{
              position: 'absolute',
              left: '10',
              fontWeight: 'bold',
              fontSize: '30px',
              cursor: 'pointer',
              bottom: '80'
            }}
            onClick={handleSetProductBack} />

          <IoIosArrowDropright
            style={{
              position: 'absolute',
              right: '10', fontWeight: 'bold',
              fontSize: '30px',
              cursor: 'pointer',
              bottom: '80'
            }}
            onClick={handleSetProductNext}
          />

          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <CiCircleInfo style={{ cursor: 'pointer', fontSize: '30px', color: 'rgb(141, 166, 189)' }} onClick={handleToggleShowInformations} />
            <IoSearchCircleSharp style={{ cursor: 'pointer', fontSize: '30px', color: 'rgb(141, 166, 189)' }} onClick={handleToggleShowSearchByRef} />
            <RenderImages />
            <CiShoppingCart style={{ cursor: "pointer", fontSize: "30px", color: 'rgb(141, 166, 189)' }} />
          </div>

        </ContainerImageCarousel >
        <div>
          <span style={{ marginRight: '20px', padding: '20px' }}>{productSelected?.name?.split(' ')[0]}</span>
          <span style={{ marginRight: '20px', padding: '20px' }}>REF:{productSelected?.reference}</span>
          <span>R${parseFloat(productSelected?.price ?? 0).toFixed(2)}</span>

        </div>

        <ContainerCarrinho>
          <div>

            <h4>Atual</h4>
            <span>
              R${(productSelected?.price * quantidade).toFixed(2)}
            </span>
          </div>
          <GrSubtractCircle style={{ cursor: "pointer", fontSize: "30px" }} onClick={diminuirQuantidade} />
          <input type="text" value={quantidade} onChange={handleQuantidadeChange} />
          <IoMdAddCircle style={{ cursor: "pointer", fontSize: "30px" }} onClick={aumentarQuantidade} />
          <div>
            <h4>Acumulado</h4>
            <span>
              R${(productSelected?.price * quantidade).toFixed(2)}
            </span>
          </div>
        </ContainerCarrinho>

        <ContainerTamanhos>
          <ProductSizes product={productSelected} />
        </ContainerTamanhos>


      </>
    );
  }

}

export default ProductDetail;
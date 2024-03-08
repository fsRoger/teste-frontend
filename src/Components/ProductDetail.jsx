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
  ProductDetailHeaderContainer,
  ContainerCarrinho,
  ContainerTamanhos,
  TamanhoBox,
  TamanhoCircle,
  ContainerThumbs,
  ContainerImageCarousel,
  HeaderInfo,
  TextInfo,
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

  const [quantidadesPorProduto, setQuantidadesPorProduto] = useState({});

  const aumentarQuantidade = () => {
    setQuantidadesPorProduto((prevQuantidades) => ({
      ...prevQuantidades,
      [productSelected.reference]: (prevQuantidades[productSelected.reference] || 0) + 1,
    }));
  };

  const diminuirQuantidade = () => {
    if (quantidadesPorProduto[productSelected.reference] > 0) {
      setQuantidadesPorProduto((prevQuantidades) => ({
        ...prevQuantidades,
        [productSelected.reference]: prevQuantidades[productSelected.reference] - 1,
      }));
    }
  };

  const handleQuantidadeChange = (event) => {
    const newQuantidade = parseInt(event.target.value, 10);
    setQuantidadesPorProduto((prevQuantidades) => ({
      ...prevQuantidades,
      [productSelected.reference]: isNaN(newQuantidade) ? 0 : newQuantidade,
    }));
  };

  const calcularValorTotalPorProduto = () => {
    const quantidadeAtual = quantidadesPorProduto[productSelected.reference] || 0;
    return (productSelected.price * quantidadeAtual).toFixed(2);
  };

  const calcularValorTotalAcumulado = () => {
    const totalAcumulado = products.products.reduce((acc, product) => {
      const quantidade = quantidadesPorProduto[product.reference] || 0;
      return acc + product.price * quantidade;
    }, 0);

    return totalAcumulado.toFixed(2);
  };

  /////------------Caixas de Tamanhos------------
  function ProductSizes({ product }) {
    const somaTotalTamanhos = Object.values(product.sizes).reduce((acc, quantity) => acc + quantity, 0);
    return (
      <>
        <ContainerTamanhos>
          {Object.entries(product.sizes).map(([size, quantity]) => (
            <TamanhoBox key={size}>
              <TamanhoCircle>
                <span>{size}</span>
              </TamanhoCircle >
              <span>{quantity}</span>
            </TamanhoBox>
          ))}
          <span style={{ marginLeft: '5px', color: 'white' }}>=</span>
          <TamanhoBox style={{ marginLeft: '10px' }}>
            <p style={{ color: 'white', fontWeight: 'bold', margin: '4px', marginLeft: '5px' }}>PACK</p>
            <span>{somaTotalTamanhos}</span>
          </TamanhoBox >
        </ContainerTamanhos>
      </>
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
          <>
            <ContainerThumbs>
              <img
                src={image.image}
                key={index}
                alt={productSelected.name}
                onClick={handleSetImageSelected}
              />
            </ContainerThumbs>
          </>
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
          height: '100%',
          width: '80%',
          borderRadius: '3px',
          border: '1px solid rgb(141, 166, 189)',
          top: '5%',
          right: '10%',
          zIndex: 2,
        }}>
          <HeaderInfo>
            Informações
            <MdCancel style={{ cursor: 'pointer', position: 'absolute', right: '0' }} onClick={handleToggleShowInformations} />
          </HeaderInfo>

          <TextInfo style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '5px' }}>
            <span><a>Nome do produto:</a> {productSelected?.name}</span>
            <span><a>Referência:</a> {productSelected?.reference}</span>
            <span><a>Marca:</a> {productSelected?.brand_name}</span>
            <span><a>Categoria:</a> {productSelected?.category_name}</span>
            <span><a>Gênero:</a> {productSelected?.group_name}</span>
          </TextInfo>
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
          height: '100%',
          width: '80%',
          borderRadius: '3px',
          border: '1px solid rgb(141, 166, 189)',
          top: '5%',
          right: '10%',
          zIndex: 2,
        }}>
          <HeaderInfo >

            BUSCAR POR REF
            <MdCancel style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '0'
            }}
              onClick={handleToggleShowSearchByRef}
            />
          </HeaderInfo>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px' }}>
            <input placeholder='00.00.0000' onChange={handleChangeSearchByRef} style={{ padding: '5px', marginBottom: '10px', border: 'none', background: '#ccc' }}></input>
            <button onClick={handleSearchByRef} style={{ padding: '5px', borderRadius: '5px', color: 'white', fontWeight: 'bold', backgroundColor: 'rgb(141, 166, 189)', border: 'none' }}>Buscar</button>
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

        }}>
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
          <hr
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 55,
              backgroundColor: 'gray',
              height: '2px',
              border: 'none',
              justifyContent: 'start'
            }}
          />
          <hr
            style={{
              position: 'absolute',
              width: '80%',
              bottom: 0,
              backgroundColor: 'gray',
              height: '1px',
              border: 'none',
              justifyContent: 'start'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}>
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
            <span>R${calcularValorTotalPorProduto()}</span>
          </div>
          <GrSubtractCircle style={{ cursor: 'pointer', fontSize: '30px' }} onClick={diminuirQuantidade} />
          <input type="text" value={quantidadesPorProduto[productSelected.reference] || 0} onChange={handleQuantidadeChange} />
          <IoMdAddCircle style={{ cursor: 'pointer', fontSize: '30px' }} onClick={aumentarQuantidade} />
          <div>
            <h4>Acumulado</h4>
            <span>R${calcularValorTotalAcumulado()}</span>
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
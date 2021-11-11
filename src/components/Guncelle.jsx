import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import KisilerServis from "../service/KisilerServis";
import { useParams } from "react-router";
const Guncelle = () => {
  const [kisi, setKisi] = useState({ ad: "", soyad: "", yas: "" });
  const { ad, soyad, yas } = kisi;
  const degistir = (event) => {
    const { name, value } = event.target;
    setKisi(() => {
      return {
        ...kisi,
        [name]: value,
      };
    });
  };
  //* useParam hook ile App.js route icerisindeki id parametresini cek.
  const { id } = useParams();

  //* Sayfa ilk render edildiginde id ile veritabanindan guncellenecek kisinin verileri getir
  useEffect(() => {
    KisilerServis.idIleKisiGetir(id).then((res) => {
      setKisi(res.data);
    });
  }, [id]);
  const handleGuncelle = () => {
    KisilerServis.idIleKisiGuncelle(id, kisi).then();
  };

  return (
    <Container>
      <h1 className="text-center mt-3">GUNCELLEME SAYFASI</h1>
      <Form className="m-4">
        <Form.Group controlId="ad">
          <Form.Label>Ad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ad giriniz"
            value={ad}
            name="ad"
            onChange={degistir}
          />
        </Form.Group>
        <Form.Group controlId="soyad">
          <Form.Label>Soyad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Soyad giriniz"
            value={soyad}
            name="soyad"
            onChange={degistir}
          />
        </Form.Group>
        <Form.Group controlId="yas">
          <Form.Label>Yaş</Form.Label>
          <Form.Control
            type="number"
            placeholder="Yaş giriniz"
            value={yas}
            name="yas"
            onChange={degistir}
          />
        </Form.Group>
        <div className="mt-3 text-center">
          <Button variant="primary" type="submit" onClick={handleGuncelle}>
            Guncelle
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default Guncelle;

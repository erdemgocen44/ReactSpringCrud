import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import KisilerServis from "../service/KisilerServis";
import { useHistory } from "react-router-dom";
//tablo tek satır haline getirdikten sonra useState, useEffect yaz, sonra kisiler map yaz
const Listele = () => {
  const [kisiler, setKisiler] = useState([]);
  //? Listele komponenti her render edildiğinde ve kisiler hook'u her degistiginde useEffect Hook'u calisir ve değişen sonuç ekranda (localhost) gözükür
  useEffect(() => {
    KisilerServis.tumKisileriGetir().then((res) => {
      setKisiler(res.data);
    });
  }, []);
  //kisiler array olmazsa sonsuza dek veritabanından veri çekmeye devam eder. kisiler array, her çalıştığında sıfırdan ekle manasına geliyor
  //sil metodu
  const siliver = (id) => {
    KisilerServis.idIleKisiSil(id).then(() => {
      KisilerServis.tumKisileriGetir().then((res) => {
        setKisiler(res.data);
      });
    });
  };

  //güncelle metodu
  const history = useHistory();
  const güncelleyiver = (id) => {
    history.push(`/guncelle/${id}`);
  };
  return (
    //react bootstrap table dan aldık geldik
    <Container className="mt-4">
      {kisiler.length === 0 ? (
        <h1 className="text-center">
          Veritabaninda Kayitli Kisi bulunmamaktadir.
        </h1>
      ) : (
        <div>
          <h1 className="text-center">KISILER TABLOSU</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#id</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Yaş</th>
                <th style={{ width: "250px" }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {/* değişkenleri jsx formatında yazmak için süslü */}
              {kisiler.map((kisi) => {
                const { ad, soyad, yas, id } = kisi;
                return (
                  //burada map unique bir key istiyor key:id
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{ad}</td>
                    <td>{soyad}</td>
                    <td>{yas}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        style={{ width: "100px" }}
                        onClick={() => güncelleyiver(id)}
                      >
                        Guncelle
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => siliver(id)}
                        //burada handleSil de parametreliyken arrow yapmazsan sil e basmadan da sil metodu çalışır, parametresizse arrow a gerek yok.hatta console da bakarsan yada localhost ta, bütün verileri siliverir
                        style={{ marginLeft: "10px", width: "100px" }}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};
export default Listele;

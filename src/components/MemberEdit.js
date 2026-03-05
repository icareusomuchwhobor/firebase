import React, { useState, useEffect } from "react";
import {
  db,
  doc,
  getDocs,
  updateDoc,
  collection,
  deleteDoc,
} from "./firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";

const MemberEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id_mem, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [docId, setDocId] = useState("");
  const { id } = location.state || {};

  const fetchMember = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "members"));
      const memberData = querySnapshot.docs.find(doc => doc.data().id_mem === id);
      if (memberData) {
        const data = memberData.data();
        setId(data.id_mem);
        setName(data.name_mem);
        setEmail(data.email_mem);
        setPassword(data.password_mem);
        setDocId(memberData.id);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (window.confirm("ยืนยันการบันทึกการเปลี่ยนแปลงข้อมูล?")) {
      try {
        await updateDoc(doc(db, "members", docId), {
          name_mem: name,
          email_mem: email,
          password_mem: password,
        });
        alert("อัปเดตข้อมูลสำเร็จ");
        navigate("/");
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการอัปเดต");
      }
    }
  };

  const handledel = async () => {
    if (window.confirm("⚠️ คุณต้องการลบข้อมูลสมาชิกรายนี้อย่างถาวรใช่หรือไม่?")) {
      try {
        await deleteDoc(doc(db, "members", docId));
        alert("ลบข้อมูลสำเร็จ");
        navigate("/");
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handlecancel = () => {
    navigate("/");
  };

  // --- UI Styles ---
  const styles = {
    wrapper: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Sarabun', sans-serif"
    },
    card: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      borderTop: '6px solid #1e3a8a'
    },
    title: {
      color: '#1e3a8a',
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center'
    },
    formGroup: { marginBottom: '20px' },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#475569',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none'
    },
    idDisplay: {
      fontSize: '13px',
      color: '#94a3b8',
      marginBottom: '20px',
      textAlign: 'center'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '30px'
    },
    primaryRow: {
      display: 'flex',
      gap: '10px'
    },
    btnSave: {
      flex: 2,
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer'
    },
    btnCancel: {
      flex: 1,
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer'
    },
    btnDelete: {
      width: '100%',
      backgroundColor: 'transparent',
      color: '#ef4444',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #fee2e2',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 แก้ไขข้อมูลสมาชิก</h2>
        <div style={styles.idDisplay}>รหัสสมาชิกเอกสาร: {docId}</div>

        <form onSubmit={handleEdit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>ชื่อ-นามสกุล</label>
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>อีเมล</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>รหัสผ่าน</label>
            <input
              style={styles.input}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <div style={styles.primaryRow}>
              <button type="button" style={styles.btnCancel} onClick={handlecancel}>
                ยกเลิก
              </button>
              <button type="submit" style={styles.btnSave}>
                บันทึกการแก้ไข
              </button>
            </div>
            
            <button 
              type="button" 
              style={styles.btnDelete} 
              onClick={handledel}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ลบสมาชิกรายนี้
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberEdit;
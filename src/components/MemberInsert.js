import React, { useState } from "react";
import { db, collection, addDoc } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const MemberInsert = () => {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูลสมาชิกใหม่?");
    if (userConfirmed) {
      try {
        await addDoc(collection(db, "members"), {
          id_mem: Number(id),
          name_mem: name,
          email_mem: email,
          password_mem: password
        });
        alert("บันทึกข้อมูลสำเร็จ");
        navigate("/");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    }
  };

  const handleCancel = () => {
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
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    formGroup: {
      marginBottom: '20px'
    },
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
      outline: 'none',
      transition: 'all 0.2s'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '30px'
    },
    btnSave: {
      flex: 2,
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '15px'
    },
    btnCancel: {
      flex: 1,
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '15px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <span>➕</span> เพิ่มสมาชิกใหม่
        </h2>
        
        <form onSubmit={handleAdd}>
          <div style={styles.formGroup}>
            <label style={styles.label}>ID ผู้ใช้</label>
            <input
              style={styles.input}
              type="number"
              placeholder="เช่น 1001"
              value={id}
              onChange={(e) => setID(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ชื่อ-นามสกุล</label>
            <input
              style={styles.input}
              type="text"
              placeholder="ระบุชื่อจริง และนามสกุล"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>อีเมล (Email Address)</label>
            <input
              style={styles.input}
              type="email"
              placeholder="example@ubru.ac.th"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>รหัสผ่าน</label>
            <input
              style={styles.input}
              type="password"
              placeholder="กำหนดรหัสผ่านเข้าใช้งาน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              style={styles.btnCancel} 
              onClick={handleCancel}
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              style={styles.btnSave}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1e3a8a'}
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberInsert;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "./firebaseConfig";

const MemberSearch = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "members"));
      setResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const filteredMembers = results.filter((member) =>
    member.name_mem?.toLowerCase().includes(name.toLowerCase())
  );

  useEffect(() => {
    handleSearch();
  }, []);

  const handleEdit = (id) => {
    navigate("/edit", { state: { id: id } });
  };

  const handleAdd = () => {
    navigate("/insert");
  };

  // --- UI Styles (ใช้ CSS ทั่วไปที่จำลองสไตล์ Tailwind) ---
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Sarabun', sans-serif"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1e3a8a',
      margin: 0
    },
    searchBar: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px'
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    btnAdd: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    th: {
      backgroundColor: '#f8fafc',
      color: '#64748b',
      textAlign: 'left',
      padding: '16px',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '2px solid #f1f5f9'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f1f5f9',
      fontSize: '14px',
      color: '#334155'
    },
    btnEdit: {
      backgroundColor: 'transparent',
      color: '#1e3a8a',
      border: '1px solid #1e3a8a',
      padding: '6px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>ระบบจัดการสมาชิก</h2>
        <button 
          style={styles.btnAdd} 
          onClick={handleAdd}
          onMouseOver={(e) => e.target.style.opacity = '0.9'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          + เพิ่มข้อมูล
        </button>
      </div>

      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="🔍 ค้นหาจากชื่อ-นามสกุล..."
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <style>{`
                tr:hover { background-color: #fcfdfe; }
                button:hover { filter: brightness(1.1); }
              `}</style>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>ชื่อ-นามสกุล</th>
              <th style={styles.th}>E-mail</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td style={styles.td}><strong>#{member.id.substring(0, 5)}</strong></td>
                  <td style={styles.td}>{member.name_mem}</td>
                  <td style={styles.td}>{member.email_mem}</td>
                  <td style={styles.td}>
                    <button 
                      style={styles.btnEdit} 
                      onClick={() => handleEdit(member.id_mem)}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{...styles.td, textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
                  ไม่พบข้อมูลสมาชิก
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberSearch;
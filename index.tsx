import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- DATA MOCKS ---
// In a real app, this would come from a database.
const NEW_CATEGORIES = [
  'أثاث المركز الوطني للتوجيه المهني',
  'أجهزة الحاسوب',
  'أدوات كهربائية والكترونية',
  'إجزاء الحاسب الآلي',
  'اخرى',
  'ادوات السلامة العامة',
  'ادوات صيانة',
  'ادوات كشفية',
  'ادوات مطابخ',
  'ادوات مكتبة وقرطاسية',
  'اصدارات الوزارة',
  'تعليمية مستدم',
  'الأجهزة التعليمية',
  'الأحياء',
  'الأثاث',
  'الاحبار',
  'الجيولوجيا والفلك',
  'الصيانة العامة وادواتها',
  'الفيزياء',
  'القرطاسية',
  'الكتب',
  'الكتب المكبرة',
  'الكيمياء',
  'اللجنة الوطنية العمانية للتربية والثقافة والعلوم',
  'المختبرات',
  'المشاريع والصيانة',
  'المكتبات',
  'النقليات والخدمات',
  'الوسائل التعليمية',
  'برامج حاسوب',
  'حبر ريكو',
  'حديد ملاعب مفككه',
  'فلاتر متعددة الإستخدام',
  'فلاشات',
  'قسم النقليات قطع الغيار والصيانة',
  'قطع غيار أجهزة الحاسوب والأجهزة التعليمية',
  'كتب أخرى',
  'كتب المعرض صفوف التهيئة',
  'كتب برايل للمكفوفين',
  'كل أجهزة الكمبيوتر و شاشات',
  'كل اجهزة الكمبيوتر و شاشات العرض',
  'لوحات شمسية',
  'مخزن الأثاث والاجهزة المستعمل',
  'مخزن المستعمل',
  'مستعمل قرطاسية',
  'مستلزمات التدريب',
  'معرض كتب المكتبات',
  'مواد غذائية المركز الوطني للتوجيه المهني',
  'مواد كهربائي'
].sort((a, b) => a.localeCompare(b, 'ar'));

const OLD_INVENTORY_ITEMS: Record<string, string[]> = {
  'الكتب': ['كتاب الرياضيات للصف الأول', 'كتاب العلوم للصف الثاني', 'كتاب اللغة العربية للصف الثالث', 'كتاب التاريخ للصف الرابع'],
  'الأثاث': ['كرسي طالب', 'طاولة معلم', 'خزانة كتب', 'سبورة بيضاء'],
  'الوسائل التعليمية': ['خريطة العالم', 'مجسم الهيكل العظمي', 'جهاز عرض ضوئي (بروجكتور)', 'مجموعة كيمياء'],
  'ادوات مكتبة وقرطاسية': [
    'أقلام سبورة (مجموعة)',
    'دفاتر (ربطة)',
    'ممحاة (صندوق)',
    'أقلام رصاص (صندوق)',
    'ترانكیت',
    'جهاز سوتش',
    'طباعة وتورید ملف الخدمة',
    'علبه (حاسبة + قلم + فلاش)',
    'کابلات',
    'مظاريف كبيرة A3 FALCON',
    'نقاط كهربائية'
  ],
  'أثاث المركز الوطني للتوجيه المهني': [
    'جلسه كراسي للمكتبه',
    'ستائر رول',
    'طاولة مكتب',
    'طاوله اجتماع',
    'طاوله مكتب',
    'كراسي الزوار',
    'كراسي طاوله الاجتماع',
    'كرسي مكتب',
    'كمبريسر مكيف'
  ],
  'أجهزة الحاسوب': [
    'جهاز حاسب آلي محمول',
    'جهاز حاسب آلي مكتبي',
    'جهاز ماسح البصمة',
    'سيرفر',
    'طابعة',
    'ماسحة ضوئية'
  ],
  'اخرى': [
    'أعمدة ألمنيوم للمسرح',
    'توريد وتركيب أجهزة بصمه للمدارس',
    'صندوق مجمع كهرباء',
    'كرفان',
    'كرفانه',
    'منصة حديد'
  ],
  'ادوات السلامة العامة': [
    'أدوات السلامة العامة',
    'توريد وتركيب كاميرات مبنى المدرسة',
    'جهاز قياس الحرارة ثابته'
  ],
  'المشاريع والصيانة': [
    'مثقاب بدوي ( محمول ) بطارية 18 فولت بملحقاته',
    'ادوات المشاريع والصيانة',
    'سلم ( درج ) ألومنيوم منتقل'
  ],
  'ادوات صيانة': [
    'كيبلات'
  ],
  'أدوات كهربائية والكترونية': [
    'جهاز قياس متعدد (ملتيميتر)',
    'كاوية لحام',
    'أسلاك توصيل',
    'لوح تجارب (Breadboard)'
  ],
  'ادوات مطابخ': [
    'طقم أواني طهي',
    'أدوات مائدة (شوك, ملاعق, سكاكين)',
    'أكواب وصحون',
    'ثلاجة صغيرة',
    'ادوات مطابخ'
  ],
  'الفيزياء': [
    'مجموعة منشورات ضوئية',
    'ميزان حساس',
    'مجموعة دوائر كهربائية',
    'مغناطيسيات متنوعة'
  ],
  'الكيمياء': [
    'أنابيب اختبار',
    'كؤوس زجاجية مدرجة',
    'موقد بنسن',
    'ورق عباد الشمس'
  ],
  'الأحياء': [
    'مجهر ضوئي (ميكروسكوب)',
    'شرائح مجهرية جاهزة',
    'مجسم تشريح ضفدع',
    'أدوات تشريح أساسية'
  ],
  'ادوات كشفية': [
    'مسائلمات الكشافة'
  ],
  'اصدارات الوزارة': [
    'مطوية السلطنة وسجل ذاكرة اليونسكو'
  ],
  'الأجهزة التعليمية': [
    'آلة تصوير',
    'السبورة التفاعلية',
    'تلفاز',
    'جهاز عرض',
    'سبورة التفاعلية الذكية',
    'مجهر',
    'IP هواتف'
  ]
};

// --- INVENTORY GENERATION ---
const generateInitialInventory = (): Record<string, Record<string, number>> => {
  const initialInventory: Record<string, Record<string, number>> = {};
  for (const category of NEW_CATEGORIES) {
    initialInventory[category] = {};
    const items = OLD_INVENTORY_ITEMS[category] || [];
    for (const item of items) {
      // Assign a random stock between 20 and 150 for variety
      initialInventory[category][item] = Math.floor(Math.random() * 131) + 20;
    }
  }
  return initialInventory;
};


const INITIAL_WAREHOUSE_KEEPERS = [
  { id: 1, name: 'أحمد عبدالله', specialties: ['الكتب', 'الكتب المكبرة', 'كتب برايل للمكفوفين'], phone: '99887766' },
  { id: 2, name: 'خالد محمد', specialties: ['الأثاث', 'مخزن الأثاث والاجهزة المستعمل'], phone: '91122334' },
  { id: 3, name: 'سارة علي', specialties: ['الوسائل التعليمية', 'الأجهزة التعليمية'], phone: '95566778' },
  { id: 4, name: 'فاطمة حسن', specialties: ['ادوات مكتبة وقرطاسية', 'القرطاسية'], phone: '94433221' },
  { id: 5, name: 'يوسف إبراهيم', specialties: ['أدوات كهربائية والكترونية', 'الصيانة العامة وادواتها'], phone: '97788990' },
  { id: 6, name: 'نورة تركي', specialties: ['ادوات مطابخ'], phone: '96655443' },
  { id: 7, name: 'عبدالعزيز فيصل', specialties: ['الفيزياء', 'الجيولوجيا والفلك'], phone: '98899001' },
  { id: 8, name: 'ريم سعد', specialties: ['الكيمياء'], phone: '92233445' },
  { id: 9, name: 'سلطان فهد', specialties: ['الأحياء', 'المختبرات'], phone: '93344556' }
];

// --- TYPES ---
type Inventory = Record<string, Record<string, number>>;
type Page = 'main' | 'orderForm' | 'admin' | 'pendingOrders' | 'allOrders';
type UserRole = 'school' | 'admin';
type Keeper = {
  id: number;
  name: string;
  specialties: (keyof Inventory)[];
  phone: string;
};
type PendingOrder = {
  id: number;
  item: string;
  category: keyof Inventory;
  quantity: number;
  schoolName: string;
  schoolCode: string;
  requesterName: string;
  schoolPhone: string;
  timestamp: string;
  notes?: string;
};
type AdminLog = {
  id: number;
  timestamp: string;
  action: string;
  details: string;
};


// --- HELPER FUNCTIONS ---
const getStockIndicator = (stock: number): { indicator: string; text: string; className: string } => {
    if (stock === 0) {
        return { indicator: '🔴', text: 'منتهية', className: 'stock-unavailable' };
    }
    if (stock <= 20) {
        return { indicator: '🟡', text: 'كمية منخفضة', className: 'stock-low' };
    }
    return { indicator: '🟢', text: 'كمية كافية', className: 'stock-available' };
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [page, setPage] = useState<Page>('main');
  const [userRole, setUserRole] = useState<UserRole>('school');
  const [selectedCategory, setSelectedCategory] = useState<keyof Inventory | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [warehouseKeepers, setWarehouseKeepers] = useState<Keeper[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<PendingOrder[]>([]);
  const [editingOrder, setEditingOrder] = useState<PendingOrder | null>(null);
  const [inventory, setInventory] = useState<Inventory>({});
  const [adminLog, setAdminLog] = useState<AdminLog[]>([]);


  // Load data from localStorage on initial render
  useEffect(() => {
    // Keepers
    try {
      const storedKeepers = localStorage.getItem('warehouseKeepers');
      if (storedKeepers) {
        // Migration for users with old data structure
        const parsedKeepers = JSON.parse(storedKeepers).map((k: any) => {
            if (k.specialty && !k.specialties) {
                return { ...k, specialties: [k.specialty], specialty: undefined };
            }
            if (!k.specialties) {
                return { ...k, specialties: [] };
            }
            return k;
        });
        setWarehouseKeepers(parsedKeepers);
      } else {
        setWarehouseKeepers(INITIAL_WAREHOUSE_KEEPERS);
        localStorage.setItem('warehouseKeepers', JSON.stringify(INITIAL_WAREHOUSE_KEEPERS));
      }
    } catch (error) {
      console.error("Failed to load/parse warehouse keepers:", error);
      setWarehouseKeepers(INITIAL_WAREHOUSE_KEEPERS);
    }
    // Pending Orders
     try {
      const storedOrders = localStorage.getItem('pendingOrders');
      if (storedOrders) {
        setPendingOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
        console.error("Failed to load/parse pending orders:", error);
    }
    // Completed Orders
    try {
      const storedCompletedOrders = localStorage.getItem('completedOrders');
      if (storedCompletedOrders) {
        setCompletedOrders(JSON.parse(storedCompletedOrders));
      }
    } catch (error) {
        console.error("Failed to load/parse completed orders:", error);
    }
    // Inventory
    try {
        const storedInventory = localStorage.getItem('inventory');
        if (storedInventory && Object.keys(JSON.parse(storedInventory)).length > 0) {
            setInventory(JSON.parse(storedInventory));
        } else {
            const initialInv = generateInitialInventory();
            setInventory(initialInv);
            localStorage.setItem('inventory', JSON.stringify(initialInv));
        }
    } catch (error) {
        console.error("Failed to load/parse inventory:", error);
        setInventory(generateInitialInventory());
    }
    // Admin Log
    try {
      const storedLog = localStorage.getItem('adminLog');
      if (storedLog) {
        setAdminLog(JSON.parse(storedLog));
      }
    } catch (error) {
        console.error("Failed to load/parse admin log:", error);
    }
  }, []);
  
  // --- LocalStorage Savers ---
  const savePendingOrders = (orders: PendingOrder[]) => {
      setPendingOrders(orders);
      localStorage.setItem('pendingOrders', JSON.stringify(orders));
  };
  
  const saveCompletedOrders = (orders: PendingOrder[]) => {
      setCompletedOrders(orders);
      localStorage.setItem('completedOrders', JSON.stringify(orders));
  };

  const saveInventory = (inv: Inventory) => {
    setInventory(inv);
    localStorage.setItem('inventory', JSON.stringify(inv));
  };
  
  const saveKeepers = (newKeepers: Keeper[]) => {
      setWarehouseKeepers(newKeepers);
      localStorage.setItem('warehouseKeepers', JSON.stringify(newKeepers));
  }
  
  const saveAdminLog = (log: AdminLog[]) => {
    setAdminLog(log);
    localStorage.setItem('adminLog', JSON.stringify(log));
  };
  
  const handleLogAction = (action: string, details: string) => {
    const newLogEntry: AdminLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('ar-SA'),
        action,
        details,
    };
    // Keep the log from getting too big, limit to 100 entries
    saveAdminLog([newLogEntry, ...adminLog].slice(0, 100)); 
  };


  // --- Handlers ---
  const handleStartOrder = (category: keyof Inventory, item: string, quantity: number) => {
    setSelectedCategory(category);
    setSelectedItem(item);
    setSelectedQuantity(quantity);
    setEditingOrder(null);
    setPage('orderForm');
  };

  const handleBack = () => {
    if (page === 'orderForm') {
        if(editingOrder) {
            setPage('pendingOrders');
            setEditingOrder(null);
        } else {
            setPage('main');
        }
    }
    else if (page === 'pendingOrders') setPage('main');
    else if (page === 'allOrders') setPage('main');
    else setPage('main'); // Default back action
  };

  const handleFormSubmit = (formData: { schoolName: string; schoolCode: string; requesterName: string; schoolPhone: string; notes?: string; quantity: number; }) => {
    if ((!selectedItem || !selectedCategory) && !editingOrder) return;

    if (editingOrder) {
        const updatedOrders = pendingOrders.map(order => 
            order.id === editingOrder.id ? { ...order, ...formData, notes: formData.notes?.trim() ? formData.notes.trim() : undefined } : order
        );
        savePendingOrders(updatedOrders);
        setEditingOrder(null);
    } else {
        const newOrder: PendingOrder = {
            id: Date.now(),
            item: selectedItem!,
            category: selectedCategory!,
            timestamp: new Date().toLocaleString('ar-SA'),
            ...formData,
            notes: formData.notes?.trim() ? formData.notes.trim() : undefined
        };
        savePendingOrders([...pendingOrders, newOrder]);
    }
    
    setPage('pendingOrders');
  };

   const handleSendOrder = (orderToSend: PendingOrder) => {
      const keeper = warehouseKeepers.find(k => k.specialties.includes(orderToSend.category));
      if (!keeper) {
        alert('عفواً، لا يوجد أمين مستودع مسؤول عن هذا الصنف. يرجى التواصل مع الإدارة.');
        return;
      }
      
      const currentStock = inventory[orderToSend.category]?.[orderToSend.item] ?? 0;
      if(orderToSend.quantity > currentStock) {
          alert(`عفواً، الكمية المطلوبة للمادة "${orderToSend.item}" لم تعد متوفرة بالمخزون. يرجى تعديل الطلب.`);
          return;
      }

      let message = `
  طلب جديد
  ---
  تاريخ الطلب: ${orderToSend.timestamp}
  المادة المطلوبة: ${orderToSend.item}
  الكمية: ${orderToSend.quantity}
  اسم المدرسة: ${orderToSend.schoolName}
  رمز المدرسة: ${orderToSend.schoolCode}
  اسم مقدم الطلب: ${orderToSend.requesterName}
  رقم هاتف المدرسة: ${orderToSend.schoolPhone}
      `.trim();
      
      if (orderToSend.notes) {
          message += `\n\nملاحظات:\n${orderToSend.notes}`;
      }
  
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/968${keeper.phone}?text=${encodedMessage}`;
  
      // Deduct from inventory BEFORE updating order states
      const newInventory = JSON.parse(JSON.stringify(inventory)); // Deep copy
      newInventory[orderToSend.category][orderToSend.item] = currentStock - orderToSend.quantity;
      saveInventory(newInventory);
      
      // Open WhatsApp and update order lists
      window.open(whatsappUrl, '_blank');
      const updatedPending = pendingOrders.filter(order => order.id !== orderToSend.id);
      savePendingOrders(updatedPending);
      saveCompletedOrders([...completedOrders, orderToSend]);
  };
  
  const handleEditOrder = (order: PendingOrder) => {
      setEditingOrder(order);
      setPage('orderForm');
  };

  const handleDeleteOrder = (orderId: number) => {
      const updatedOrders = pendingOrders.filter(order => order.id !== orderId);
      savePendingOrders(updatedOrders);
  };
  
  // Render logic
  const renderContent = () => {
    // If admin page is selected by a school user, redirect to main
    if (page === 'admin' && userRole === 'school') {
        setPage('main');
        return <MainPage 
                    inventory={inventory}
                    onStartOrder={handleStartOrder}
                />;
    }

    switch (page) {
      case 'orderForm':
        return <OrderFormPage 
                    item={editingOrder ? editingOrder.item : selectedItem!} 
                    category={editingOrder ? editingOrder.category : selectedCategory!}
                    quantity={editingOrder ? editingOrder.quantity : selectedQuantity}
                    onSubmit={handleFormSubmit} 
                    onBack={handleBack}
                    initialData={editingOrder} 
                    inventory={inventory}
                />;
      case 'pendingOrders':
        return <PendingOrdersPage 
                    orders={pendingOrders}
                    keepers={warehouseKeepers}
                    onSend={handleSendOrder}
                    onEdit={handleEditOrder}
                    onDelete={handleDeleteOrder}
                    onBack={() => setPage('main')}
                    inventory={inventory}
                />
      case 'allOrders':
        return <AllOrdersPage 
                    pendingOrders={pendingOrders}
                    completedOrders={completedOrders}
                    onBack={() => setPage('main')}
                />
      case 'admin':
        return <AdminPanel 
                    keepers={warehouseKeepers} 
                    onSaveKeepers={saveKeepers} 
                    inventory={inventory} 
                    onSaveInventory={saveInventory}
                    adminLog={adminLog}
                    onLogAction={handleLogAction}
                />;
      case 'main':
      default:
        return <MainPage 
                    inventory={inventory}
                    onStartOrder={handleStartOrder}
                />;
    }
  };

  return (
    <>
      <header className="app-header">
         <div className="header-left">
            <h1>نظام طلبات المستودعات</h1>
            <div className="role-switcher">
                <span>الوضع:</span>
                <button className={userRole === 'school' ? 'active' : ''} onClick={() => setUserRole('school')}>مدرسة</button>
                <button className={userRole === 'admin' ? 'active' : ''} onClick={() => setUserRole('admin')}>مسؤول</button>
            </div>
        </div>
        <div className="header-buttons">
            <button className="header-btn" onClick={() => setPage('allOrders')}>
                سجل الطلبات
            </button>
            {page !== 'pendingOrders' && (
                <button className="header-btn pending-orders-btn" onClick={() => setPage('pendingOrders')}>
                    طلباتي المعلقة
                    {pendingOrders.length > 0 && <span className="badge">{pendingOrders.length}</span>}
                </button>
            )}
            {userRole === 'admin' && (
                <button className="admin-toggle" onClick={() => setPage(page === 'admin' ? 'main' : 'admin')}>
                  {page === 'admin' ? 'العودة للتطبيق' : 'لوحة التحكم'}
                </button>
            )}
        </div>
      </header>
      <main className="container">
        {renderContent()}
      </main>
      <footer className="app-footer">
        <p>فكرة أ.أنور المعمري</p>
        <p>إنشاء وتطوير حارث الغنبوصي</p>
        <div className="footer-contact">
            للتواصل: 
            <a href="mailto:harith.qanbosi@gmail.com" aria-label="أرسل بريد إلكتروني">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
        </div>
      </footer>
    </>
  );
};

// --- PAGE COMPONENTS ---

const MainPage = ({ inventory, onStartOrder }: { 
    inventory: Inventory,
    onStartOrder: (category: keyof Inventory, item: string, quantity: number) => void 
}) => {
    const categories = Object.keys(inventory).filter(cat => Object.keys(inventory[cat]).length > 0);
    const [selectedCategory, setSelectedCategory] = useState<keyof Inventory | ''>('');
    const [selectedItem, setSelectedItem] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [subItems, setSubItems] = useState<string[]>([]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value as keyof Inventory;
        setSelectedCategory(category);
        setSelectedItem(''); // Reset item selection
        setQuantity('1'); // Reset quantity
        setSubItems(Object.keys(inventory[category] || {}));
    };
    
    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(e.target.value);
        setQuantity('1'); // Reset quantity
    };
    
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(e.target.value);
        } else if (e.target.value === '') {
            setQuantity('');
        }
    };

    const handleNext = () => {
        const numQuantity = parseInt(quantity, 10);
        if (selectedCategory && selectedItem && numQuantity > 0) {
            onStartOrder(selectedCategory, selectedItem, numQuantity);
        }
    };
    
    const availableStock = selectedCategory && selectedItem ? inventory[selectedCategory]?.[selectedItem] ?? 0 : 0;
    const stockInfo = getStockIndicator(availableStock);
    const numQuantity = parseInt(quantity, 10) || 0;
    const isQuantityInvalid = numQuantity > availableStock || numQuantity <= 0;
    const isNextDisabled = !selectedCategory || !selectedItem || !quantity || isQuantityInvalid;

    return (
        <div className="form-container" style={{ margin: '2rem auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>إنشاء طلب جديد</h2>
            <div className="form-group">
                <label htmlFor="mainCategory">اختر صنف الطلب الرئيسي</label>
                <select id="mainCategory" value={selectedCategory} onChange={handleCategoryChange} className="form-control">
                    <option value="" disabled>-- اختر الصنف --</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="subItem">اختر المادة المطلوبة</label>
                <select id="subItem" value={selectedItem} onChange={handleItemChange} disabled={!selectedCategory || subItems.length === 0} className="form-control">
                    <option value="" disabled>-- اختر المادة --</option>
                    {subItems.length > 0 ? (
                        subItems.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    ) : selectedCategory ? (
                         <option value="" disabled>لا توجد مواد متاحة حالياً لهذا الصنف</option>
                    ) : null}
                </select>
            </div>

            {selectedItem && (
                <div className="form-group">
                    <label htmlFor="quantity">الكمية</label>
                     <div className="quantity-info">
                        <span className={stockInfo.className}>
                            {stockInfo.indicator} مستوى المخزون: {stockInfo.text}
                        </span>
                    </div>
                    <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        value={quantity} 
                        onChange={handleQuantityChange}
                        className="form-control"
                        min="1"
                        max={availableStock}
                        required
                        aria-label="الكمية"
                        disabled={availableStock === 0}
                    />
                     {numQuantity > availableStock && availableStock > 0 && (
                        <p className="error-message">الكمية المطلوبة أكبر من المتوفر.</p>
                    )}
                </div>
            )}

            <button 
                className="btn btn-primary btn-block" 
                style={{ marginTop: '1.5rem' }}
                onClick={handleNext} 
                disabled={isNextDisabled}
            >
                التالي
            </button>
        </div>
    );
};

const PendingOrdersPage = ({ orders, keepers, onSend, onEdit, onDelete, onBack, inventory }: {
    orders: PendingOrder[];
    keepers: Keeper[];
    onSend: (order: PendingOrder) => void;
    onEdit: (order: PendingOrder) => void;
    onDelete: (orderId: number) => void;
    onBack: () => void;
    inventory: Inventory;
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmation, setConfirmation] = useState<{ action: 'send' | 'delete', order: PendingOrder } | null>(null);

    const filteredOrders = orders.filter(order =>
        order.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.schoolCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.notes && order.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleConfirm = () => {
        if (!confirmation) return;

        if (confirmation.action === 'send') {
            onSend(confirmation.order);
        } else if (confirmation.action === 'delete') {
            onDelete(confirmation.order.id);
        }
        setConfirmation(null);
    };

    const getModalProps = () => {
        if (!confirmation) return { title: '', message: '', confirmDisabled: false };

        if (confirmation.action === 'send') {
            const keeper = keepers.find(k => k.specialties.includes(confirmation.order.category));
            const message = keeper
                ? (
                    <div>
                        <p>سيتم إرسال هذا الطلب إلى أمين المستودع المسؤول:</p>
                        <div className="keeper-info">
                            <p><strong>الاسم:</strong> {keeper.name}</p>
                            <div className="keeper-specialties">
                                <strong>التخصصات:</strong>
                                <div className="specialties-list">
                                    {keeper.specialties.map(spec => <span key={spec} className="specialty-badge">{spec}</span>)}
                                </div>
                            </div>
                        </div>
                        <p>هل تود المتابعة؟</p>
                    </div>
                  )
                : 'عفواً، لا يوجد أمين مستودع مسؤول عن هذا الصنف. لا يمكن إرسال الطلب.';
            return {
                title: 'تأكيد الإرسال',
                message,
                confirmDisabled: !keeper
            };
        }

        if (confirmation.action === 'delete') {
            return {
                title: 'تأكيد الإلغاء',
                message: 'هل أنت متأكد من إلغاء هذا الطلب؟ سيتم حذفه نهائياً.',
                confirmDisabled: false
            };
        }
        return { title: '', message: '', confirmDisabled: true };
    };
    
    const modalProps = getModalProps();

    return (
        <div className="pending-orders-container">
            <button className="btn btn-secondary back-button" onClick={onBack}>&rarr; العودة للصفحة الرئيسية</button>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>الطلبات المعلقة</h2>

            {orders.length > 0 && (
              <div className="search-bar-container">
                <input
                  type="text"
                  placeholder="ابحث باسم المدرسة، الرمز، المادة، أو الملاحظات..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="ابحث في الطلبات المعلقة"
                />
              </div>
            )}

            {orders.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>لا توجد طلبات معلقة حالياً.</p>
            ) : filteredOrders.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>لا توجد طلبات تطابق بحثك.</p>
            ) : (
                <div className="orders-grid">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-card-header">
                                <h4>{order.item}</h4>
                            </div>
                            <p><strong>الكمية:</strong> {order.quantity}</p>
                            <p><strong>المدرسة:</strong> {order.schoolName}</p>
                            <p><strong>رمز المدرسة:</strong> {order.schoolCode}</p>
                            <p><strong>مقدم الطلب:</strong> {order.requesterName}</p>
                            <p><strong>الهاتف:</strong> {order.schoolPhone}</p>
                            <p><strong>تاريخ الطلب:</strong> {order.timestamp}</p>
                            {order.notes && <p className="order-notes"><strong>ملاحظات:</strong> {order.notes}</p>}
                            <div className="order-card-actions">
                                <button className="btn btn-success" onClick={() => setConfirmation({ action: 'send', order })}>إرسال عبر واتساب</button>
                                <button className="btn btn-secondary" onClick={() => onEdit(order)}>تعديل</button>
                                <button className="btn btn-danger" onClick={() => setConfirmation({ action: 'delete', order })}>إلغاء</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {confirmation && (
                <ConfirmationModal
                    isOpen={!!confirmation}
                    onClose={() => setConfirmation(null)}
                    onConfirm={handleConfirm}
                    title={modalProps.title}
                    message={modalProps.message}
                    confirmDisabled={modalProps.confirmDisabled}
                />
            )}
        </div>
    );
};

const AllOrdersPage = ({ pendingOrders, completedOrders, onBack }: {
    pendingOrders: PendingOrder[];
    completedOrders: PendingOrder[];
    onBack: () => void;
}) => {
    return (
        <div className="all-orders-container">
            <button className="btn btn-secondary back-button" onClick={onBack}>&rarr; العودة للصفحة الرئيسية</button>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>سجل الطلبات</h2>

            <section className="orders-section">
                <h3>الطلبات المعلقة ({pendingOrders.length})</h3>
                {pendingOrders.length === 0 ? (
                    <p className="no-orders-message">لا توجد طلبات معلقة حالياً.</p>
                ) : (
                    <div className="orders-grid">
                        {pendingOrders.map(order => (
                            <div key={order.id} className="order-card readonly-order-card">
                                <div className="order-card-header">
                                    <h4>{order.item}</h4>
                                    <span className="status-badge status-pending">معلق</span>
                                </div>
                                <p><strong>الكمية:</strong> {order.quantity}</p>
                                <p><strong>المدرسة:</strong> {order.schoolName} ({order.schoolCode})</p>
                                <p><strong>مقدم الطلب:</strong> {order.requesterName}</p>
                                <p><strong>الهاتف:</strong> {order.schoolPhone}</p>
                                <p><strong>تاريخ الطلب:</strong> {order.timestamp}</p>
                                {order.notes && <p className="order-notes"><strong>ملاحظات:</strong> {order.notes}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </section>
            
            <section className="orders-section">
                <h3>الطلبات المكتملة ({completedOrders.length})</h3>
                {completedOrders.length === 0 ? (
                    <p className="no-orders-message">لا توجد طلبات مكتملة بعد.</p>
                ) : (
                    <div className="orders-grid">
                        {completedOrders.map(order => (
                            <div key={order.id} className="order-card readonly-order-card">
                                <div className="order-card-header">
                                    <h4>{order.item}</h4>
                                    <span className="status-badge status-completed">مكتمل</span>
                                </div>
                                <p><strong>الكمية:</strong> {order.quantity}</p>
                                <p><strong>المدرسة:</strong> {order.schoolName} ({order.schoolCode})</p>
                                <p><strong>مقدم الطلب:</strong> {order.requesterName}</p>
                                <p><strong>الهاتف:</strong> {order.schoolPhone}</p>
                                <p><strong>تاريخ الطلب:</strong> {order.timestamp}</p>
                                {order.notes && <p className="order-notes"><strong>ملاحظات:</strong> {order.notes}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};


const OrderFormPage = ({ item, category, quantity, onSubmit, onBack, initialData, inventory }: { 
    item: string;
    category: keyof Inventory;
    quantity: number;
    onSubmit: (data: any) => void; 
    onBack: () => void;
    initialData?: PendingOrder | null;
    inventory: Inventory;
}) => {
  const [formData, setFormData] = useState({ 
    schoolName: initialData?.schoolName || '', 
    schoolCode: initialData?.schoolCode || '',
    requesterName: initialData?.requesterName || '', 
    schoolPhone: initialData?.schoolPhone || '',
    notes: initialData?.notes || '',
    quantity: initialData?.quantity || quantity || 1
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const isEditing = !!initialData;
  
  const availableStock = isEditing 
    ? (inventory[initialData.category]?.[initialData.item] ?? 0) + initialData.quantity 
    : (inventory[category]?.[item] ?? 0);
  const stockInfo = getStockIndicator(isEditing ? availableStock - initialData.quantity : availableStock);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[79]\d{7}$/; // Omani numbers are 8 digits and start with 7 or 9
    if (!phone || phoneRegex.test(phone)) {
        setPhoneError('');
        return true;
    } else {
        setPhoneError('الرجاء إدخال رقم هاتف عماني صالح مكون من 8 أرقام ويبدأ بـ 7 أو 9.');
        return false;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let finalValue: string | number = value;
    if (type === 'number') {
        const numValue = parseInt(value, 10);
        finalValue = numValue > 0 ? numValue : 1;
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));

    if (name === 'schoolPhone') {
        validatePhone(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [formData.schoolName, formData.schoolCode, formData.requesterName, formData.schoolPhone];
    if (requiredFields.some(val => String(val).trim() === '')) {
      alert('يرجى تعبئة جميع الحقول الإلزامية');
      return;
    }
    if (!validatePhone(formData.schoolPhone)) {
        alert('الرجاء إدخال رقم هاتف صحيح للمتابعة.');
        return;
    }
    if (formData.quantity > availableStock) {
        alert(`الكمية المطلوبة أكبر من الكمية المتوفرة.`);
        return;
    }
    setIsModalOpen(true);
  };
  
  const handleConfirmSubmit = () => {
      onSubmit(formData);
      setIsModalOpen(false);
  }

  return (
    <>
      <div className="form-container">
        <h2>{isEditing ? 'تعديل طلب المادة' : 'طلب المادة'}: <span style={{ color: 'var(--primary-color)' }}>{item}</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="schoolName">اسم المدرسة</label>
            <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} required aria-label="اسم المدرسة" />
          </div>
          <div className="form-group">
            <label htmlFor="schoolCode">رمز المدرسة</label>
            <input type="text" id="schoolCode" name="schoolCode" value={formData.schoolCode} onChange={handleChange} required placeholder="مثال: 123456" aria-label="رمز المدرسة" />
          </div>
          <div className="form-group">
            <label htmlFor="requesterName">اسم مقدم الطلب</label>
            <input type="text" id="requesterName" name="requesterName" value={formData.requesterName} onChange={handleChange} required aria-label="اسم مقدم الطلب" />
          </div>
          <div className="form-group">
            <label htmlFor="schoolPhone">رقم هاتف المدرسة (للتواصل عبر واتساب)</label>
            <input 
              type="tel" 
              id="schoolPhone" 
              name="schoolPhone" 
              value={formData.schoolPhone} 
              onChange={handleChange} 
              required 
              placeholder="مثال: 91234567" 
              aria-label="رقم هاتف المدرسة"
              aria-invalid={!!phoneError}
              aria-describedby="phone-error"
            />
             {phoneError && <p id="phone-error" className="error-message">{phoneError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">الكمية</label>
            <div className="quantity-info">
                <span className={stockInfo.className}>
                    {stockInfo.indicator} مستوى المخزون: {stockInfo.text}
                </span>
            </div>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange}
              min="1"
              max={availableStock}
              required 
              aria-label="الكمية"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">ملاحظات (اختياري)</label>
            <textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange}
              placeholder="أضف أي تعليمات خاصة أو تفاصيل إضافية هنا..." 
              aria-label="ملاحظات إضافية"
            ></textarea>
          </div>
          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={onBack}>إلغاء</button>
             <button type="submit" className="btn btn-primary">{isEditing ? 'تحديث الطلب' : 'حفظ الطلب'}</button>
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title={isEditing ? "تأكيد التعديل" : "تأكيد حفظ الطلب"}
        message={isEditing ? "هل أنت متأكد من حفظ التعديلات؟" : "سيتم حفظ الطلب في قائمة الطلبات المعلقة ويمكنك إرساله أو تعديله لاحقاً."}
       />
    </>
  );
};


const WarehouseKeepersAdmin = ({ keepers, onSaveKeepers, inventory, onLogAction }: { 
    keepers: Keeper[], 
    onSaveKeepers: (keepers: Keeper[]) => void, 
    inventory: Inventory,
    onLogAction: (action: string, details: string) => void 
}) => {
    type NewKeeper = Omit<Keeper, 'id'>;
    const [newKeeper, setNewKeeper] = useState<NewKeeper>({ name: '', specialties: [], phone: '' });
    const [deletingKeeper, setDeletingKeeper] = useState<Keeper | null>(null);
    const [editingKeeper, setEditingKeeper] = useState<Keeper | null>(null);

    const handleAddKeeper = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newKeeper.name.trim() || !newKeeper.phone.trim() || newKeeper.specialties.length === 0) {
            alert('يرجى تعبئة جميع الحقول وتحديد تخصص واحد على الأقل.');
            return;
        }
        const newKeeperWithId = { ...newKeeper, id: Date.now() };
        onLogAction('إضافة أمين مخزن', `الاسم: ${newKeeper.name}, التخصصات: ${newKeeper.specialties.join('، ')}`);
        onSaveKeepers([...keepers, newKeeperWithId]);
        setNewKeeper({ name: '', specialties: [], phone: '' }); // Reset form
    };
    
    const handleConfirmDelete = () => {
        if (!deletingKeeper) return;
        onLogAction('حذف أمين مخزن', `تم حذف: ${deletingKeeper.name}`);
        onSaveKeepers(keepers.filter(k => k.id !== deletingKeeper.id));
        setDeletingKeeper(null);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'specialties') {
            const selectedOptions = (e.target as HTMLSelectElement).selectedOptions;
            const selectedSpecialties = Array.from(selectedOptions).map(option => option.value);
            setNewKeeper(prev => ({...prev, specialties: selectedSpecialties as (keyof Inventory)[]}));
        } else {
             setNewKeeper(prev => ({...prev, [name]: value}));
        }
    };

    const handleStartEdit = (keeper: Keeper) => {
        setEditingKeeper({ ...keeper }); // Start editing a copy
    };

    const handleCancelEdit = () => {
        setEditingKeeper(null);
    };

    const handleSaveEdit = () => {
        if (!editingKeeper) return;

        if (!editingKeeper.name.trim() || !editingKeeper.phone.trim() || editingKeeper.specialties.length === 0) {
            alert("يرجى تعبئة جميع الحقول وتحديد تخصص واحد على الأقل.");
            return;
        }

        onLogAction('تعديل أمين مخزن', `تم تعديل بيانات: ${editingKeeper.name}`);
        const updatedKeepers = keepers.map(k => k.id === editingKeeper.id ? editingKeeper : k);
        onSaveKeepers(updatedKeepers);
        setEditingKeeper(null);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingKeeper) return;
        const { name, value } = e.target;

        if (name === 'specialties') {
            const selectedOptions = (e.target as HTMLSelectElement).selectedOptions;
            const selectedSpecialties = Array.from(selectedOptions).map(option => option.value);
            setEditingKeeper(prev => prev ? { ...prev, specialties: selectedSpecialties as (keyof Inventory)[] } : null);
        } else {
            setEditingKeeper(prev => prev ? { ...prev, [name]: value } : null);
        }
    };

    return (
        <div>
            <h3>قائمة أمناء المخازن الحالية</h3>
            <div className="table-responsive">
                <table className="keepers-table">
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>التخصصات</th>
                            <th>رقم الهاتف</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {keepers.length > 0 ? keepers.map(keeper => (
                            editingKeeper && editingKeeper.id === keeper.id ? (
                                <tr key={keeper.id} className="editing-row">
                                    <td><input type="text" name="name" value={editingKeeper.name} onChange={handleEditChange} className="form-control" /></td>
                                    <td>
                                        <select multiple name="specialties" value={editingKeeper.specialties} onChange={handleEditChange} className="form-control" style={{minHeight: '100px'}}>
                                            {Object.keys(inventory).sort((a,b) => a.localeCompare(b, 'ar')).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </td>
                                    <td><input type="tel" name="phone" value={editingKeeper.phone} onChange={handleEditChange} className="form-control" /></td>
                                    <td className="keeper-actions">
                                        <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>حفظ</button>
                                        <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>إلغاء</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={keeper.id}>
                                    <td>{keeper.name}</td>
                                    <td className="specialties-cell">
                                        {keeper.specialties && keeper.specialties.length > 0 ?
                                            keeper.specialties.map(spec => <span key={spec} className="specialty-badge">{spec}</span>) :
                                            <span style={{ color: 'var(--secondary-color)' }}>لا يوجد</span>
                                        }
                                    </td>
                                    <td>{keeper.phone}</td>
                                    <td className="keeper-actions">
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleStartEdit(keeper)}>تعديل</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => setDeletingKeeper(keeper)}>حذف</button>
                                    </td>
                                </tr>
                            )
                        )) : (
                            <tr>
                                <td colSpan={4} style={{textAlign: 'center'}}>لا يوجد بيانات لعرضها</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h3 style={{marginTop: '2rem'}}>إضافة أمين مخزن جديد</h3>
            <form onSubmit={handleAddKeeper} className="form-container form-admin">
                <div className="grid">
                    <div className="form-group">
                        <label htmlFor="name">الاسم</label>
                        <input type="text" id="name" name="name" value={newKeeper.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialties">التخصص (يمكن تحديد أكثر من خيار)</label>
                        <select multiple name="specialties" id="specialties" value={newKeeper.specialties} onChange={handleChange} required style={{minHeight: '150px'}}>
                            {Object.keys(inventory).sort((a,b) => a.localeCompare(b, 'ar')).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">رقم الهاتف</label>
                        <input type="tel" id="phone" name="phone" value={newKeeper.phone} onChange={handleChange} required placeholder="مثال: 91234567" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}}>إضافة</button>
            </form>

            {deletingKeeper && (
                <ConfirmationModal
                    isOpen={!!deletingKeeper}
                    onClose={() => setDeletingKeeper(null)}
                    onConfirm={handleConfirmDelete}
                    title="تأكيد حذف أمين المخزن"
                    message={`هل أنت متأكد من حذف سجل أمين المخزن "${deletingKeeper.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
                />
            )}
        </div>
    );
};

const InventoryAdmin = ({ inventory, onSaveInventory, onLogAction }: { 
    inventory: Inventory, 
    onSaveInventory: (inv: Inventory) => void,
    onLogAction: (action: string, details: string) => void
}) => {
    const [newCategory, setNewCategory] = useState('');
    const [newItem, setNewItem] = useState({ category: '', name: '', quantity: '0' });
    const [editingStock, setEditingStock] = useState<Record<string, Record<string, string>>>({});
    const [editingCategory, setEditingCategory] = useState<{ oldName: string; newName: string } | null>(null);
    const [deletingTarget, setDeletingTarget] = useState<{ type: 'item' | 'category', category: string, item?: string } | null>(null);
    
    const handleUpdateStock = (category: string, item: string) => {
        const newStockStr = editingStock[category]?.[item];
        if (newStockStr === undefined || newStockStr.trim() === '') return;
        
        const newStock = parseInt(newStockStr, 10);
        if (isNaN(newStock) || newStock < 0) {
            alert("الرجاء إدخال كمية صحيحة.");
            return;
        }

        const oldStock = inventory[category][item];
        const newInventory = JSON.parse(JSON.stringify(inventory));
        newInventory[category][item] = newStock;
        
        onLogAction('تحديث كمية', `المادة: "${item}" | الكمية: ${oldStock} -> ${newStock}`);
        onSaveInventory(newInventory);
        
        // Clear editing state for this item
        const newEditingState = JSON.parse(JSON.stringify(editingStock));
        delete newEditingState[category][item];
        setEditingStock(newEditingState);
    };

    const handleStockChange = (category: string, item: string, value: string) => {
        setEditingStock(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [item]: value
            }
        }));
    };

    const handleAddNewItem = (e: React.FormEvent) => {
        e.preventDefault();
        const { category, name, quantity } = newItem;
        if (!category || !name.trim()) {
            alert("الرجاء اختيار صنف وإدخال اسم المادة.");
            return;
        }
        const numQuantity = parseInt(quantity, 10);
        if (isNaN(numQuantity) || numQuantity < 0) {
            alert("الرجاء إدخال كمية صحيحة.");
            return;
        }
        const newInventory = JSON.parse(JSON.stringify(inventory));
        if (newInventory[category][name.trim()]) {
            alert("هذه المادة موجودة مسبقاً في نفس الصنف.");
            return;
        }
        newInventory[category][name.trim()] = numQuantity;
        onLogAction('إضافة مادة', `المادة: "${name.trim()}" | الصنف: "${category}" | الكمية: ${numQuantity}`);
        onSaveInventory(newInventory);
        setNewItem({ category: '', name: '', quantity: '0' });
    };

    const handleAddNewCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            alert("الرجاء إدخال اسم الصنف الجديد.");
            return;
        }
        const newInventory = JSON.parse(JSON.stringify(inventory));
        if (newInventory[newCategory.trim()]) {
            alert("هذا الصنف موجود مسبقاً.");
            return;
        }
        newInventory[newCategory.trim()] = {};
        onLogAction('إضافة صنف', `اسم الصنف: ${newCategory.trim()}`);
        onSaveInventory(newInventory);
        setNewCategory('');
    };

    const handleConfirmDelete = () => {
        if (!deletingTarget) return;
        const newInventory = JSON.parse(JSON.stringify(inventory));
        if (deletingTarget.type === 'item' && deletingTarget.item) {
            onLogAction('حذف مادة', `المادة: "${deletingTarget.item}" | الصنف: "${deletingTarget.category}"`);
            delete newInventory[deletingTarget.category][deletingTarget.item];
        } else if (deletingTarget.type === 'category') {
            onLogAction('حذف صنف', `الصنف: "${deletingTarget.category}" وكل مواده`);
            delete newInventory[deletingTarget.category];
        }
        onSaveInventory(newInventory);
        setDeletingTarget(null);
    };

    const handleDeleteItem = (category: string, item: string) => {
        setDeletingTarget({ type: 'item', category, item });
    };
    
    const handleDeleteCategory = (category: string) => {
         setDeletingTarget({ type: 'category', category });
    };

    const handleEditCategoryName = (category: string) => {
        setEditingCategory({ oldName: category, newName: category });
    };

    const handleCancelEdit = () => {
        setEditingCategory(null);
    };

    const handleSaveCategoryName = () => {
        if (!editingCategory || !editingCategory.newName.trim()) {
            alert('اسم الصنف لا يمكن أن يكون فارغاً.');
            return;
        }

        const { oldName, newName } = editingCategory;
        const trimmedNewName = newName.trim();

        if (trimmedNewName === oldName) {
            setEditingCategory(null); // No change
            return;
        }
        if (inventory[trimmedNewName]) {
            alert('هذا الصنف موجود مسبقاً.');
            return;
        }

        const newInventory = JSON.parse(JSON.stringify(inventory));
        newInventory[trimmedNewName] = newInventory[oldName];
        delete newInventory[oldName];
        
        onLogAction('تعديل اسم صنف', `تغيير "${oldName}" إلى "${trimmedNewName}"`);
        onSaveInventory(newInventory);
        setEditingCategory(null);
    };

    const categories = Object.keys(inventory).sort((a,b) => a.localeCompare(b, 'ar'));

    return (
        <div>
            <div className="inventory-forms">
                <form onSubmit={handleAddNewCategory} className="form-container form-admin">
                    <h3>إضافة صنف رئيسي جديد</h3>
                    <div className="form-group">
                        <label htmlFor="newCategory">اسم الصنف</label>
                        <input type="text" id="newCategory" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="مثال: مواد تنظيف" required />
                    </div>
                    <button type="submit" className="btn btn-primary">إضافة صنف</button>
                </form>

                <form onSubmit={handleAddNewItem} className="form-container form-admin">
                    <h3>إضافة مادة جديدة</h3>
                    <div className="form-group">
                         <label htmlFor="itemCategory">اختر الصنف</label>
                         <select id="itemCategory" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} required>
                             <option value="" disabled>-- اختر --</option>
                             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                         </select>
                    </div>
                     <div className="form-group">
                        <label htmlFor="newItemName">اسم المادة</label>
                        <input type="text" id="newItemName" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="مثال: أقلام حبر أزرق" required />
                    </div>
                     <div className="form-group">
                        <label htmlFor="newItemQuantity">الكمية الأولية</label>
                        <input type="number" min="0" id="newItemQuantity" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary">إضافة مادة</button>
                </form>
            </div>
            
            <h3 style={{marginTop: '2rem'}}>المخزون الحالي</h3>
             {categories.map(category => (
                <details key={category} className="inventory-category" open>
                    <summary>
                        {editingCategory?.oldName === category ? (
                            <div className="category-edit-group">
                                <input 
                                    type="text" 
                                    value={editingCategory.newName}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })}
                                    className="category-edit-input"
                                    autoFocus
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleSaveCategoryName(); if (e.key === 'Escape') handleCancelEdit(); }}
                                />
                                <button className="btn btn-success btn-sm" onClick={handleSaveCategoryName}>حفظ</button>
                                <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>إلغاء</button>
                            </div>
                        ) : (
                            <>
                                <div className="category-summary-title">{category} ({Object.keys(inventory[category]).length} مواد)</div>
                                <div className="category-summary-actions">
                                    <button className="btn btn-secondary btn-sm" onClick={(e) => { e.preventDefault(); handleEditCategoryName(category);}}>تعديل الاسم</button>
                                    <button className="btn btn-danger btn-sm" onClick={(e) => { e.preventDefault(); handleDeleteCategory(category);}}>حذف الصنف</button>
                                </div>
                            </>
                        )}
                    </summary>
                     <div className="table-responsive">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>المادة</th>
                                    <th>الكمية الحالية</th>
                                    <th>تحديث الكمية</th>
                                    <th>إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(inventory[category]).sort((a,b) => a.localeCompare(b, 'ar')).map(item => (
                                    <tr key={item}>
                                        <td>{item}</td>
                                        <td>{inventory[category][item]}</td>
                                        <td>
                                            <div className="update-stock-group">
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    value={editingStock[category]?.[item] ?? ''}
                                                    onChange={(e) => handleStockChange(category, item, e.target.value)}
                                                    placeholder="الكمية الجديدة"
                                                    className="stock-input"
                                                />
                                                <button className="btn btn-success btn-sm" onClick={() => handleUpdateStock(category, item)}>تحديث</button>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(category, item)}>حذف</button>
                                        </td>
                                    </tr>
                                ))}
                                {Object.keys(inventory[category]).length === 0 && (
                                    <tr><td colSpan={4} style={{textAlign: 'center'}}>لا توجد مواد في هذا الصنف.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </details>
            ))}

            {deletingTarget && (
                <ConfirmationModal
                    isOpen={!!deletingTarget}
                    onClose={() => setDeletingTarget(null)}
                    onConfirm={handleConfirmDelete}
                    title={deletingTarget.type === 'item' ? 'تأكيد حذف المادة' : 'تأكيد حذف الصنف'}
                    message={
                        deletingTarget.type === 'item' 
                        ? `هل أنت متأكد أنك تريد حذف المادة "${deletingTarget.item}" بشكل نهائي؟`
                        : `تنبيه! سيتم حذف الصنف "${deletingTarget.category}" بشكل نهائي مع كل المواد التابعة له. هل تريد المتابعة؟`
                    }
                />
            )}
        </div>
    );
};

const AdminLogViewer = ({ logs }: { logs: AdminLog[] }) => {
    return (
        <div>
            <h3>سجل آخر التحديثات</h3>
            {logs.length === 0 ? (
                <p>لا توجد تحديثات مسجلة بعد.</p>
            ) : (
                <div className="table-responsive">
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th>الوقت والتاريخ</th>
                                <th>الإجراء</th>
                                <th>التفاصيل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.timestamp}</td>
                                    <td>{log.action}</td>
                                    <td>{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const AdminPanel = ({ keepers, onSaveKeepers, inventory, onSaveInventory, adminLog, onLogAction }: { 
    keepers: Keeper[], 
    onSaveKeepers: (keepers: Keeper[]) => void, 
    inventory: Inventory, 
    onSaveInventory: (inv: Inventory) => void,
    adminLog: AdminLog[],
    onLogAction: (action: string, details: string) => void
}) => {
    const [activeTab, setActiveTab] = useState<'keepers' | 'inventory' | 'log'>('keepers');

    return (
        <div className="admin-panel">
            <h2>لوحة التحكم</h2>
            <nav className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'keepers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('keepers')}
                    aria-controls="keepers-panel"
                    role="tab"
                    aria-selected={activeTab === 'keepers'}
                >
                    إدارة أمناء المخازن
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventory')}
                    aria-controls="inventory-panel"
                    role="tab"
                    aria-selected={activeTab === 'inventory'}
                >
                    إدارة المخزون
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'log' ? 'active' : ''}`}
                    onClick={() => setActiveTab('log')}
                    aria-controls="log-panel"
                    role="tab"
                    aria-selected={activeTab === 'log'}
                >
                    سجل التحديثات
                </button>
            </nav>

            <div className="tab-content">
                {activeTab === 'keepers' && (
                    <div id="keepers-panel" role="tabpanel" aria-labelledby="keepers-tab">
                         <WarehouseKeepersAdmin keepers={keepers} onSaveKeepers={onSaveKeepers} inventory={inventory} onLogAction={onLogAction} />
                    </div>
                )}
                {activeTab === 'inventory' && (
                     <div id="inventory-panel" role="tabpanel" aria-labelledby="inventory-tab">
                        <InventoryAdmin inventory={inventory} onSaveInventory={onSaveInventory} onLogAction={onLogAction} />
                    </div>
                )}
                 {activeTab === 'log' && (
                     <div id="log-panel" role="tabpanel" aria-labelledby="log-tab">
                        <AdminLogViewer logs={adminLog} />
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MODAL COMPONENT ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmDisabled = false }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmDisabled?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="modal-title">{title}</h3>
          <button className="close-button" onClick={onClose} aria-label="إغلاق">&times;</button>
        </div>
        <div className="modal-body">
          <div className="modal-message">{message}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>إلغاء</button>
          <button className="btn btn-primary" onClick={onConfirm} disabled={confirmDisabled}>تأكيد</button>
        </div>
      </div>
    </div>
  );
};


// --- RENDER THE APP ---
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
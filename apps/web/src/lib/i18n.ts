/**
 * VidyaFloww i18n Translation Dictionary
 * Supports: English (en) | Hindi (hi)
 * Scope: Navigation shell, page titles, table columns, form labels, status badges, common actions
 */

export type Language = 'en' | 'hi';

export const translations = {
  // ─── NAVIGATION / SIDEBAR ─────────────────────────────────────────────────
  'nav.dashboard':     { en: 'Dashboard',     hi: 'डैशबोर्ड' },
  'nav.students':      { en: 'Students',       hi: 'छात्र' },
  'nav.admissions':    { en: 'Admissions',     hi: 'प्रवेश' },
  'nav.teachers':      { en: 'Teachers',       hi: 'शिक्षक' },
  'nav.attendance':    { en: 'Attendance',     hi: 'उपस्थिति' },
  'nav.timetable':     { en: 'Timetable',      hi: 'समय-सारणी' },
  'nav.fees':          { en: 'Payments',       hi: 'भुगतान' },
  'nav.examinations':  { en: 'Examinations',   hi: 'परीक्षाएं' },
  'nav.academics':     { en: 'Academics',      hi: 'अकादमिक' },
  'nav.homework':      { en: 'Homework',       hi: 'गृहकार्य' },
  'nav.notices':       { en: 'Notices',        hi: 'सूचनाएं' },
  'nav.scholarships':  { en: 'Scholarships',   hi: 'छात्रवृत्ति' },
  'nav.reports':       { en: 'Reports',        hi: 'रिपोर्ट' },
  'nav.statistics':    { en: 'Statistics',     hi: 'आंकड़े' },
  'nav.resources':     { en: 'Library',        hi: 'पुस्तकालय' },
  'nav.lms':           { en: 'E-Learning',     hi: 'ई-लर्निंग' },
  'nav.portal':        { en: 'Parent Portal',  hi: 'अभिभावक पोर्टल' },
  'nav.settings':      { en: 'Settings',       hi: 'सेटिंग्स' },
  'nav.security':      { en: 'Security',       hi: 'सुरक्षा' },
  'nav.audit':         { en: 'Audit Log',      hi: 'ऑडिट लॉग' },
  'nav.salary':        { en: 'Salary',         hi: 'वेतन' },
  'nav.shortcuts':     { en: 'Shortcuts',      hi: 'शॉर्टकट' },
  'nav.license':       { en: 'License',        hi: 'लाइसेंस' },

  // ─── COMMON ACTIONS ───────────────────────────────────────────────────────
  'action.save':       { en: 'Save',           hi: 'सेव करें' },
  'action.cancel':     { en: 'Cancel',         hi: 'रद्द करें' },
  'action.edit':       { en: 'Edit',           hi: 'संपादित करें' },
  'action.delete':     { en: 'Delete',         hi: 'हटाएं' },
  'action.add':        { en: 'Add',            hi: 'जोड़ें' },
  'action.close':      { en: 'Close',          hi: 'बंद करें' },
  'action.search':     { en: 'Search',         hi: 'खोजें' },
  'action.filter':     { en: 'Filter',         hi: 'फ़िल्टर' },
  'action.export':     { en: 'Export',         hi: 'निर्यात' },
  'action.import':     { en: 'Import',         hi: 'आयात' },
  'action.download':   { en: 'Download',       hi: 'डाउनलोड' },
  'action.upload':     { en: 'Upload',         hi: 'अपलोड' },
  'action.print':      { en: 'Print',          hi: 'प्रिंट' },
  'action.view':       { en: 'View',           hi: 'देखें' },
  'action.apply':      { en: 'Apply',          hi: 'आवेदन' },
  'action.submit':     { en: 'Submit',         hi: 'जमा करें' },
  'action.confirm':    { en: 'Confirm',        hi: 'पुष्टि करें' },
  'action.back':       { en: 'Back',           hi: 'वापस' },
  'action.next':       { en: 'Next',           hi: 'अगला' },
  'action.refresh':    { en: 'Refresh',        hi: 'रीफ्रेश' },

  // ─── STATUS BADGES ────────────────────────────────────────────────────────
  'status.active':         { en: 'Active',         hi: 'सक्रिय' },
  'status.inactive':       { en: 'Inactive',        hi: 'निष्क्रिय' },
  'status.pending':        { en: 'Pending',         hi: 'लंबित' },
  'status.verified':       { en: 'Verified',        hi: 'सत्यापित' },
  'status.rejected':       { en: 'Rejected',        hi: 'अस्वीकृत' },
  'status.approved':       { en: 'Approved',        hi: 'अनुमोदित' },
  'status.paid':           { en: 'Paid',            hi: 'भुगतान किया' },
  'status.due':            { en: 'Due',             hi: 'देय' },
  'status.overdue':        { en: 'Overdue',         hi: 'अतिदेय' },
  'status.partial':        { en: 'Partial',         hi: 'आंशिक' },
  'status.present':        { en: 'Present',         hi: 'उपस्थित' },
  'status.absent':         { en: 'Absent',          hi: 'अनुपस्थित' },
  'status.late':           { en: 'Late',            hi: 'विलंबित' },
  'status.eligible':       { en: 'Eligible',        hi: 'पात्र' },
  'status.notEligible':    { en: 'Not Eligible',    hi: 'अपात्र' },
  'status.awarded':        { en: 'Awarded',         hi: 'पुरस्कृत' },

  // ─── PAGE TITLES ─────────────────────────────────────────────────────────
  'page.students':         { en: 'Students',        hi: 'छात्र' },
  'page.admissions':       { en: 'Admissions',      hi: 'प्रवेश' },
  'page.teachers':         { en: 'Teachers',        hi: 'शिक्षक' },
  'page.attendance':       { en: 'Attendance',      hi: 'उपस्थिति' },
  'page.fees':             { en: 'Payments',        hi: 'भुगतान' },
  'page.scholarships':     { en: 'Scholarships',    hi: 'छात्रवृत्ति' },
  'page.settings':         { en: 'Settings',        hi: 'सेटिंग्स' },
  'page.reports':          { en: 'Reports',         hi: 'रिपोर्ट' },
  'page.timetable':        { en: 'Timetable',       hi: 'समय-सारणी' },
  'page.examinations':     { en: 'Examinations',    hi: 'परीक्षाएं' },
  'page.homework':         { en: 'Homework',        hi: 'गृहकार्य' },
  'page.notices':          { en: 'Notices',         hi: 'सूचनाएं' },
  'page.salary':           { en: 'Salary',          hi: 'वेतन' },

  // ─── TABLE COLUMNS ────────────────────────────────────────────────────────
  'col.name':              { en: 'Name',            hi: 'नाम' },
  'col.class':             { en: 'Class',           hi: 'कक्षा' },
  'col.admNo':             { en: 'Adm No.',         hi: 'प्रवेश सं.' },
  'col.rollNo':            { en: 'Roll No.',        hi: 'रोल नं.' },
  'col.status':            { en: 'Status',          hi: 'स्थिति' },
  'col.date':              { en: 'Date',            hi: 'तारीख' },
  'col.amount':            { en: 'Amount',          hi: 'राशि' },
  'col.action':            { en: 'Action',          hi: 'कार्रवाई' },
  'col.phone':             { en: 'Phone',           hi: 'फ़ोन' },
  'col.email':             { en: 'Email',           hi: 'ईमेल' },
  'col.subject':           { en: 'Subject',         hi: 'विषय' },
  'col.marks':             { en: 'Marks',           hi: 'अंक' },
  'col.grade':             { en: 'Grade',           hi: 'ग्रेड' },
  'col.attendance':        { en: 'Attendance',      hi: 'उपस्थिति' },
  'col.fee':               { en: 'Fee',             hi: 'शुल्क' },
  'col.due':               { en: 'Due',             hi: 'देय' },
  'col.scheme':            { en: 'Scheme',          hi: 'योजना' },
  'col.waiver':            { en: 'Waiver',          hi: 'छूट' },
  'col.guardian':          { en: 'Guardian',        hi: 'अभिभावक' },
  'col.category':          { en: 'Category',        hi: 'श्रेणी' },
  'col.board':             { en: 'Board',           hi: 'बोर्ड' },
  'col.role':              { en: 'Role',            hi: 'भूमिका' },
  'col.salary':            { en: 'Salary',          hi: 'वेतन' },
  'col.designation':       { en: 'Designation',     hi: 'पदनाम' },

  // ─── FORM LABELS ─────────────────────────────────────────────────────────
  'form.fullName':         { en: 'Full Name',       hi: 'पूरा नाम' },
  'form.email':            { en: 'Email',           hi: 'ईमेल' },
  'form.phone':            { en: 'Phone',           hi: 'फ़ोन' },
  'form.password':         { en: 'Password',        hi: 'पासवर्ड' },
  'form.confirmPassword':  { en: 'Confirm Password',hi: 'पासवर्ड पुष्टि' },
  'form.dob':              { en: 'Date of Birth',   hi: 'जन्म तिथि' },
  'form.address':          { en: 'Address',         hi: 'पता' },
  'form.city':             { en: 'City',            hi: 'शहर' },
  'form.class':            { en: 'Class',           hi: 'कक्षा' },
  'form.section':          { en: 'Section',         hi: 'अनुभाग' },
  'form.gender':           { en: 'Gender',          hi: 'लिंग' },
  'form.category':         { en: 'Category',        hi: 'श्रेणी' },
  'form.admNo':            { en: 'Adm. No.',        hi: 'प्रवेश सं.' },
  'form.notes':            { en: 'Notes',           hi: 'नोट्स' },
  'form.remarks':          { en: 'Remarks',         hi: 'टिप्पणी' },
  'form.amount':           { en: 'Amount',          hi: 'राशि' },
  'form.date':             { en: 'Date',            hi: 'तारीख' },
  'form.subject':          { en: 'Subject',         hi: 'विषय' },

  // ─── STUDENT DRAWER TABS ─────────────────────────────────────────────────
  'tab.profile':           { en: 'Profile',         hi: 'प्रोफ़ाइल' },
  'tab.academic':          { en: 'Academic',        hi: 'अकादमिक' },
  'tab.attendance':        { en: 'Attendance',      hi: 'उपस्थिति' },
  'tab.fees':              { en: 'Fees',            hi: 'शुल्क' },
  'tab.scholarship':       { en: 'Scholarship',     hi: 'छात्रवृत्ति' },
  'tab.documents':         { en: 'Documents',       hi: 'दस्तावेज़' },
  'tab.family':            { en: 'Family',          hi: 'परिवार' },
  'tab.health':            { en: 'Health',          hi: 'स्वास्थ्य' },

  // ─── AUTH PAGE ────────────────────────────────────────────────────────────
  'auth.signIn':           { en: 'Sign In',         hi: 'साइन इन करें' },
  'auth.signUp':           { en: 'Create Account',  hi: 'खाता बनाएं' },
  'auth.email':            { en: 'Email / User ID', hi: 'ईमेल / उपयोगकर्ता ID' },
  'auth.password':         { en: 'Password',        hi: 'पासवर्ड' },
  'auth.forgotPassword':   { en: 'Forgot Password', hi: 'पासवर्ड भूल गए?' },
  'auth.forgotId':         { en: 'Forgot ID?',      hi: 'ID भूल गए?' },
  'auth.rememberDevice':   { en: 'Remember device', hi: 'डिवाइस याद रखें' },
  'auth.newInstitution':   { en: 'New Institution?', hi: 'नया संस्थान?' },
  'auth.registerAccount':  { en: 'Register →',      hi: 'रजिस्टर करें →' },
  'auth.backToSignIn':     { en: 'Back to Sign In', hi: 'साइन इन पर वापस' },
  'auth.continueGoogle':   { en: 'Continue with Google', hi: 'Google से जारी रखें' },
  'auth.selectRole':       { en: 'Select Role',     hi: 'भूमिका चुनें' },
  'auth.personalDetails':  { en: 'Personal Details', hi: 'व्यक्तिगत विवरण' },
  'auth.security':         { en: 'Security',         hi: 'सुरक्षा' },
  'auth.verifyOtp':        { en: 'Verify OTP',       hi: 'OTP सत्यापित करें' },
  'auth.language':         { en: 'Language',         hi: 'भाषा' },

  // ─── SETTINGS PAGE ───────────────────────────────────────────────────────
  'settings.schoolIdentity':    { en: 'School Identity',      hi: 'विद्यालय पहचान' },
  'settings.campusBranches':    { en: 'Campus Branches',      hi: 'कैम्पस शाखाएं' },
  'settings.systemHealth':      { en: 'System Health',        hi: 'सिस्टम स्वास्थ्य' },
  'settings.languageRegional':  { en: 'Language & Regional',  hi: 'भाषा और क्षेत्रीय' },
  'settings.editIdentity':      { en: 'Edit Identity',        hi: 'पहचान बदलें' },
  'settings.saveChanges':       { en: 'Save Changes',         hi: 'बदलाव सेव करें' },
  'settings.addBranch':         { en: 'Add Branch',           hi: 'शाखा जोड़ें' },
  'settings.runDiagnostics':    { en: 'Run Diagnostics',      hi: 'जांच चलाएं' },
  'settings.backupNow':         { en: 'Backup Now',           hi: 'बैकअप करें' },
  'settings.schoolName':        { en: 'School Name',          hi: 'विद्यालय नाम' },
  'settings.shortCode':         { en: 'Short Code',           hi: 'लघु कोड' },
  'settings.affiliation':       { en: 'Board Affiliation',    hi: 'बोर्ड संबद्धता' },
  'settings.city':              { en: 'City / Region',        hi: 'शहर / क्षेत्र' },
  'settings.tagline':           { en: 'Motto / Tagline',      hi: 'आदर्श वाक्य' },
  'settings.principal':         { en: 'Principal',            hi: 'प्राचार्य' },
  'settings.logo':              { en: 'Logo & Emblem',        hi: 'लोगो और प्रतीक' },

  // ─── FEES / PAYMENTS ─────────────────────────────────────────────────────
  'fees.totalDue':         { en: 'Total Due',       hi: 'कुल देय' },
  'fees.paid':             { en: 'Paid',            hi: 'भुगतान किया' },
  'fees.balance':          { en: 'Balance',         hi: 'शेष राशि' },
  'fees.payNow':           { en: 'Pay Now',         hi: 'अभी भुगतान करें' },
  'fees.receipt':          { en: 'Receipt',         hi: 'रसीद' },
  'fees.reminder':         { en: 'Send Reminder',   hi: 'रिमाइंडर भेजें' },
  'fees.waiver':           { en: 'Waiver',          hi: 'छूट' },
  'fees.installment':      { en: 'Installment',     hi: 'किस्त' },
  'fees.annually':         { en: 'Annual',          hi: 'वार्षिक' },
  'fees.quarterly':        { en: 'Quarterly',       hi: 'तिमाही' },
  'fees.monthly':          { en: 'Monthly',         hi: 'मासिक' },
  'fees.tuition':          { en: 'Tuition',         hi: 'ट्यूशन शुल्क' },
  'fees.transport':        { en: 'Transport',       hi: 'परिवहन' },
  'fees.misc':             { en: 'Misc.',           hi: 'विविध' },

  // ─── SCHOLARSHIP ─────────────────────────────────────────────────────────
  'scholarship.scheme':    { en: 'Scheme',          hi: 'योजना' },
  'scholarship.category':  { en: 'Category',        hi: 'श्रेणी' },
  'scholarship.waiver':    { en: 'Waiver',          hi: 'छूट' },
  'scholarship.sanction':  { en: 'Sanction',        hi: 'मंज़ूरी' },
  'scholarship.awarded':   { en: 'Awarded',         hi: 'पुरस्कृत' },
  'scholarship.eligible':  { en: 'Eligible',        hi: 'पात्र' },
  'scholarship.apply':     { en: 'Apply',           hi: 'आवेदन करें' },
  'scholarship.addNew':    { en: 'Add Scholarship', hi: 'छात्रवृत्ति जोड़ें' },
  'scholarship.award':     { en: 'Award Scholarship',hi: 'छात्रवृत्ति दें' },

  // ─── ATTENDANCE ───────────────────────────────────────────────────────────
  'attendance.markAll':    { en: 'Mark All',        hi: 'सब चिह्नित करें' },
  'attendance.present':    { en: 'Present',         hi: 'उपस्थित' },
  'attendance.absent':     { en: 'Absent',          hi: 'अनुपस्थित' },
  'attendance.late':       { en: 'Late',            hi: 'विलंबित' },
  'attendance.holiday':    { en: 'Holiday',         hi: 'अवकाश' },
  'attendance.rate':       { en: 'Rate',            hi: 'दर' },

  // ─── NOTIFICATIONS ────────────────────────────────────────────────────────
  'notif.title':           { en: 'Notifications',  hi: 'सूचनाएं' },
  'notif.markRead':        { en: 'Mark Read',       hi: 'पढ़ा हुआ' },
  'notif.clearAll':        { en: 'Clear All',       hi: 'सब हटाएं' },
  'notif.noNew':           { en: 'No notifications', hi: 'कोई सूचना नहीं' },

  // ─── LANGUAGE PANEL ──────────────────────────────────────────────────────
  'lang.title':            { en: 'Language',        hi: 'भाषा' },
  'lang.english':          { en: 'English',         hi: 'अंग्रेज़ी' },
  'lang.hindi':            { en: 'Hindi',           hi: 'हिन्दी' },
  'lang.chooseLang':       { en: 'Choose Language', hi: 'भाषा चुनें' },
  'lang.preview':          { en: 'Preview',         hi: 'पूर्वावलोकन' },
} as const;

export type TranslationKey = keyof typeof translations;

/**
 * Get translated string for a key and language.
 * Falls back to English if Hindi string is missing.
 */
export function translate(key: TranslationKey, lang: Language): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry['en'];
}

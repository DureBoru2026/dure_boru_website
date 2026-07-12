"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Star,
  Download,
  Heart,
  Sparkles,
  MessageSquare,
  Send,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  LogIn,
  Plus,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Sun,
  Moon,
  BookOpen,
  Briefcase,
  Layout,
  Database,
  Activity,
  FileText,
  Lock,
  Shield,
  Clock,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Award,
  Terminal,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Eye,
  Filter,
  Globe,
  Share2,
  Newspaper,
  Info,
  ThumbsUp
} from "lucide-react";
import { Resource, Blog, ContactMessage, ActivityLog, AILog, User as DBUser } from "@/lib/db";

// Bilingual translations dictionary (English and Afan Oromo)
const translations = {
  en: {
    home: "Home",
    about: "About Us",
    newsFeed: "News Feed",
    socialHub: "Social Channels",
    products: "Products & AI Tools",
    creativeTemplates: "Creative Templates",
    ebooks: "E-Books",
    aiTools: "AI Tools",
    blog: "Insights",
    support: "Get Support",
    welcomeBack: "Welcome back,",
    heroTitlePart1: "Smart Customer Service &",
    heroTitlePart2: "Digital Asset Hub",
    heroSub: "Discover premium customizable corporate gifts, editable pitch decks, high-performance web templates, e-books, and smart AI tools instantly through conversational customer support.",
    searchPlaceholder: "Search bamboo docks, PDF guides, Figma kits, Tailwind...",
    explore: "Explore",
    trending: "Trending:",
    languageLabel: "Afaan Oromoo 🌳",
    points: "points",
    demoCust: "Demo Cust",
    demoAdmin: "Demo Admin",
    signOut: "Sign Out",
    signIn: "Sign In",
    aboutHeading: "Our Vision & Mission",
    aboutTagline: "Bridging Creative Digital Assets & Smart AI Automation Across Languages",
    aboutParagraph1: "DureBoru is a high-performance digital repository and smart multilingual AI assistant built to empower creators, developers, startup founders, and design teams. We curate top-tier customizable promotional physical goods, editable layout templates, informative tech manuals, and advanced AI utilities.",
    aboutParagraph2: "Operating from East Africa with global standard aspirations, DureBoru pioneers localized tech distribution. By bridging languages like English and Afan Oromo, we ensure design workflows, documents, and corporate products are fully accessible and interactive for everyone, anywhere.",
    coreValues: "Core Pillars",
    value1Title: "Multilingual AI First",
    value1Desc: "Seamless AI assistants fluent in Afan Oromo & English to translate files, adjust tones, and explain setups.",
    value2Title: "Digital Repository",
    value2Desc: "Instant, verified downloads of production-ready presentation decks, Figma files, and optimized code templates.",
    value3Title: "Verified Corporate Goods",
    value3Desc: "Sustainable, beautifully branded physical items such as bamboo wireless docks and premium custom planners.",
    ourTeam: "Leadership Team",
    newsHeading: "Active News & Community Feed",
    newsSub: "Catch up on company announcements, system updates, and discuss the latest in multilingual AI.",
    socialHeading: "Verify Social Media Channels",
    socialSub: "Join our active channels! Confirm your subscription on Facebook, Telegram, YouTube, and TikTok to earn +100 bonus points per channel and gain access to premium downloads.",
    verifyChannel: "Verify Channel",
    verified: "Verified",
    unverified: "Verify Now",
    pointsAwarded: "Points awarded!",
    feedEmpty: "No posts yet. Be the first to publish an update!",
    btnPost: "Post Update",
    postSuccess: "Update posted to community feed!",
    writePostPlaceholder: "Share an update with the community...",
    comments: "Comments",
    likes: "Likes",
    commentPlaceholder: "Add a comment...",
    btnComment: "Comment",
    share: "Share",
    copiedLink: "Link copied to clipboard!",
    sortBy: "Sort By",
    sortDefault: "Default",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
  },
  om: {
    home: "Mana",
    about: "Waa'ee Keenya",
    newsFeed: "Oduu Haaraa",
    socialHub: "Miidiyaa Hawaasummaa",
    products: "Oomishaaleefi AI",
    creativeTemplates: "Templates",
    ebooks: "Kitaabota",
    aiTools: "Meeshaalee AI",
    blog: "Ilaalcha",
    support: "Gargaarsa",
    welcomeBack: "Baga nagaan deebite,",
    heroTitlePart1: "Tajaajila Maamiltootaa Bilshaafi",
    heroTitlePart2: "Siloojii Qabeenya Diijitaalaa",
    heroSub: "Kennaawwan daldalaa qophaa'an, gabateewwan piichii gulaalaman, kitiwwan weebsaayitii harki haaraa, jildiiwwan kitaabaafi meeshaalee AI saffisaan argadhaa.",
    searchPlaceholder: "Bamboo, qajeelfama PDF, kitiwwan Figma, Tailwind barbaadi...",
    explore: "Sakaali",
    trending: "Hordofamaa jiran:",
    languageLabel: "English 🇬🇧",
    points: "pointii",
    demoCust: "Fakkeenya Cust",
    demoAdmin: "Fakkeenya Admin",
    signOut: "Ba'i",
    signIn: "Seeni",
    aboutHeading: "Mul'atama & Ergama Keenya",
    aboutTagline: "Qabeenya Diijitaalaa Kalaqaafi Otomaatishinii AI Bilshaa Qooqota Hedduun Walqunnamsiisuu",
    aboutParagraph1: "DureBoruun kuusaa qabeenya diijitaalaa dandeettii olaanaafi tajaajila tajaajiltoota AI bilshaa hedduu-qooqati. Nutis uumtoota, abbootii daldalaafi ejensii uumamaa meeshaalee adda addaa, kitiwwan weebsaayitii, kitaabotaafi tajaajila hiikaa deggaraman dhiyeessina.",
    aboutParagraph2: "Afrikaa Bahaa irraa ka'uun fedhii sadarkaa addunyaa guutuuf, DureBoruun raabsa teeknoolojii naannoo babal'isa. Qooqawwan akka Ingiliffaafi Afan Oromoo walqunnamsiisuun, uuminsa hojiiwwanii, sanadootaafi oomishaalee daldalaa hundaaf salphaatti akka argatamu goona.",
    coreValues: "Utuboota Keenya",
    value1Title: "AI Qooqa Hedduu Dura",
    value1Desc: "Gargaartota AI dandeettii Afan Oromootiifi Ingiliffaa qaban kanneen sanadoota hiikan, qooqa sirreessan.",
    value2Title: "Kuusaa Diijitaalaa Saffisaa",
    value2Desc: "Kitiwwan Figma, gabateewwan piichiifi kitiwwan koodii qophaa'an salphaatti daandii irraa buusi.",
    value3Title: "Oomishaalee Daldalaa Mirkanaa'an",
    value3Desc: "Meeshaalee daldalaa umamaa kanneen akka bamboo chaarjarii, kitaabota qorannoo qophaa'anii fi kkf.",
    ourTeam: "Garee Hoggansaa",
    newsHeading: "Feedii Oduu & Hawaasaa",
    newsSub: "Beeksisa dhaabbataa, dhimmoota haaraa teeknoolojii AI fi seenaawwan hawaasaa dabalatee hordofi.",
    socialHeading: "Mirkaneessa Miidiyaa Hawaasummaa",
    socialSub: "Chaanaloota keenya hordofaa! Mirkaneessi Facebook, Telegram, YouTube, fi TikTok dabalatee pointii dabalataa +100 isiniif kenna, akkasumas kitiwwan dabalataa bilisaan isiniif bana.",
    verifyChannel: "Chaanalii Mirkaneessi",
    verified: "Mirkanaa'eera",
    unverified: "Mirkaneessi Haaraa",
    pointsAwarded: "Pointiin siif kennameera!",
    feedEmpty: "Maxxansi hin jiru. Jalqaba maxxansaa yaada keessan barreessaa!",
    btnPost: "Maxxansi",
    postSuccess: "Maxxansi keessan hawaasaf raabsameera!",
    writePostPlaceholder: "Yaada ykn oduu haaraa hawaasaaf qoodaa...",
    comments: "Yaadota",
    likes: "Jaalladhu",
    commentPlaceholder: "Yaada dabalii...",
    btnComment: "Yaada Barreessi",
    share: "Qoodi",
    copiedLink: "Liinkiin gara clipboarditti garagalfameera!",
    sortBy: "Haala Fooyinsaa",
    sortDefault: "Idilee",
    priceLowHigh: "Gatii: Gadi aanaarraa gara Ol aanaatti",
    priceHighLow: "Gatii: Ol aanaarraa gara Gadi aanaatti",
  }
};

export default function DureBoruPlatform() {
  // Page routing state
  const [activePage, setActivePage] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // User State
  const [currentUser, setCurrentUser] = useState<DBUser | null>({
    id: "usr_1",
    name: "Demo Customer",
    email: "customer@dureboru.com",
    role: "customer",
    avatar: "https://picsum.photos/seed/customer/200",
    createdAt: "2026-01-15T09:00:00Z",
    points: 250
  });

  // Resources state loaded from Server API
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState<boolean>(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedResourceType, setSelectedResourceType] = useState<string>("All");
  const [filterFree, setFilterFree] = useState<boolean>(false);
  const [filterPremium, setFilterPremium] = useState<boolean>(false);
  const [sortByPrice, setSortByPrice] = useState<"none" | "low-to-high" | "high-to-low">("none");

  // User details state (favorites, downloads, notifications)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // AI Recommendation State
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isAiRecommending, setIsAiRecommending] = useState<boolean>(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);

  // Floating AI Chat State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: "init",
      role: "model",
      text: "Hello! I am Boru AI, your intelligent assistant. How can I help you discover premium promotional products, presentation layouts, template setups, or tech resources today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);

  // Contact Form State
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactSubject, setContactSubject] = useState<string>("");
  const [contactMessageText, setContactMessageText] = useState<string>("");
  const [isSubmittingContact, setIsSubmittingContact] = useState<boolean>(false);

  // Admin state additions
  const [adminMessages, setAdminMessages] = useState<ContactMessage[]>([]);
  const [adminActivityLogs, setAdminActivityLogs] = useState<ActivityLog[]>([]);
  const [adminAiLogs, setAdminAiLogs] = useState<AILog[]>([]);
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  
  // Admin Create Asset Form State
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetType, setNewAssetType] = useState("template");
  const [newAssetDesc, setNewAssetDesc] = useState("");
  const [newAssetCategory, setNewAssetCategory] = useState("Creative Design");
  const [newAssetPrice, setNewAssetPrice] = useState("0");
  const [newAssetPremium, setNewAssetPremium] = useState(false);
  const [newAssetFree, setNewAssetFree] = useState(true);
  const [newAssetDownload, setNewAssetDownload] = useState("");
  const [newAssetFeatures, setNewAssetFeatures] = useState("");
  const [newAssetTags, setNewAssetTags] = useState("");
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState("");

  // Multilingual State (English & Afan Oromo)
  const [language, setLanguage] = useState<"en" | "om">("en");

  // Social Verification State
  const [socialStatus, setSocialStatus] = useState<Record<string, boolean>>({
    facebook: false,
    telegram: false,
    youtube: false,
    tiktok: false,
  });

  // News Feed Custom Posts State
  const [feedPosts, setFeedPosts] = useState<any[]>([
    {
      id: "fp_1",
      author: "DureBoru Admin",
      avatar: "https://picsum.photos/seed/dbadmin/100",
      role: "System Administrator",
      time: "2 hours ago",
      textEn: "🔥 Announcement: The DureBoru smart translator has been fully integrated with custom tone adjustments! Try pasting an Afan Oromo or English sentence in the translation tool to observe the polished, context-aware output.",
      textOm: "🔥 Beeksisa: Hiikaan bilshaan DureBoru haala qooqa sirreessuun guutummaatti wal-qabateera! Mee barreeffama Afan Oromo ykn Ingiliffaa meeshaa hiikaa keessatti galchuun bu'aa isaa gamaaggamaa.",
      likes: 42,
      liked: false,
      comments: [
        { author: "Tolosa B.", text: "This is a massive step forward for Afan Oromo localized translation tech!" },
        { author: "Chaltu K.", text: "Galatoomaa, hojii bayyee namatti tolu dha." }
      ]
    },
    {
      id: "fp_2",
      author: "Dr. Han Boru",
      avatar: "https://picsum.photos/seed/hanboru/100",
      role: "Design Lead",
      time: "1 day ago",
      textEn: "We just published 3 new premium pitch deck layouts in the Templates directory. Specially optimized for East African startups searching for visual style consistency.",
      textOm: "Kitiwwan daldalaafi gabateewwan piichii haaraa 3 dhiyoo kana kuusaa keessatti daballeerra. Startuppoota keenyaaf dandeettii olaanaafi bifa uumamaa qabu.",
      likes: 29,
      liked: false,
      comments: []
    }
  ]);
  const [newPostText, setNewPostText] = useState("");

  // UI state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [selectedDetailAsset, setSelectedDetailAsset] = useState<Resource | null>(null);
  const [newRatingScore, setNewRatingScore] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load resources from API
  const fetchResources = async () => {
    try {
      setLoadingResources(true);
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON format");
      }
      const data = await res.json();
      if (data.success) {
        setResources(data.data);
      }
    } catch (err) {
      console.warn("Could not load resources from API (running in offline preview fallback mode):", err);
    } finally {
      setLoadingResources(false);
    }
  };

  // Sync user profile & logs
  const syncUserProfile = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/auth?userId=${currentUser.id}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON format");
      }
      const data = await res.json();
      if (data.success) {
        setFavorites(data.favorites.map((f: any) => f.resourceId));
        setDownloads(data.downloads.map((d: any) => d.resourceId));
        setNotifications(data.notifications);
        // Refresh currentUser values
        setCurrentUser(prev => prev ? { ...prev, points: data.user.points } : null);
      }
    } catch (err) {
      console.warn("Could not sync profile with API:", err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchResources();
    }, 0);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        syncUserProfile();
      }, 0);
    } else {
      setTimeout(() => {
        setFavorites([]);
        setDownloads([]);
        setNotifications([]);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Scroll chatbot to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatTyping]);

  // Toast Helper
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Log Action Simulated Client-side but synced with auth
  const handleDownload = async (asset: Resource) => {
    if (!currentUser) {
      showToast("Please sign in or use the demo account to download resources.", "error");
      setActivePage("contact");
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "download",
          userId: currentUser.id,
          resourceId: asset.id,
          resourceType: asset.type
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Resource "${asset.name}" downloaded successfully! Earned +20 Rewards points.`, "success");
        setDownloads(prev => [...prev, asset.id]);
        syncUserProfile();
        
        // Trigger file download simulation
        if (asset.downloadUrl && asset.downloadUrl !== "#") {
          window.open(asset.downloadUrl, "_blank");
        }
      }
    } catch (err) {
      showToast("Download action failed. Check connection.", "error");
    }
  };

  const handleToggleFavorite = async (asset: Resource) => {
    if (!currentUser) {
      showToast("Please sign in to save items to your bookmarks.", "error");
      return;
    }

    const isFav = favorites.includes(asset.id);
    const action = isFav ? "remove_favorite" : "add_favorite";

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          userId: currentUser.id,
          resourceId: asset.id,
          resourceType: asset.type
        })
      });
      const data = await res.json();
      if (data.success) {
        if (isFav) {
          setFavorites(prev => prev.filter(id => id !== asset.id));
          showToast(`Removed "${asset.name}" from bookmarks.`, "info");
        } else {
          setFavorites(prev => [...prev, asset.id]);
          showToast(`Saved "${asset.name}" to your dashboard favorites!`, "success");
        }
        syncUserProfile();
      }
    } catch (err) {
      showToast("Could not modify bookmarks.", "error");
    }
  };

  // Verify Social Media connection and award +100 points
  const handleVerifySocialChannel = (platform: string) => {
    if (socialStatus[platform]) return;
    
    showToast(language === "om" ? `${platform} mirkaneessaa jira... ⏳` : `Verifying subscription on ${platform}... ⏳`, "info");
    
    setTimeout(() => {
      setSocialStatus(prev => ({ ...prev, [platform]: true }));
      
      // Update points
      if (currentUser) {
        setCurrentUser(prev => prev ? { ...prev, points: prev.points + 100 } : null);
      }
      
      showToast(
        language === "om" 
          ? `Pointiin +100 siif kennameera! Chaanalii ${platform} mirkanaa'eera. 🎉` 
          : `+100 points awarded! Subscription on ${platform} verified. 🎉`, 
        "success"
      );
    }, 1200);
  };

  // Submit Rating / Review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedDetailAsset) return;

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "rate",
          userId: currentUser.id,
          username: currentUser.name,
          resourceId: selectedDetailAsset.id,
          ratingValue: newRatingScore,
          reviewText: newReviewText
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Thank you for your rating & review feedback!", "success");
        setNewReviewText("");
        fetchResources(); // reload ratings count
        // reload details modal
        const updatedAsset = resources.find(r => r.id === selectedDetailAsset.id);
        if (updatedAsset) {
          setSelectedDetailAsset({
            ...updatedAsset,
            rating: data.ratings?.[0]?.rating || updatedAsset.rating
          });
        }
      }
    } catch (err) {
      showToast("Error posting review.", "error");
    }
  };

  // AI Chat Assistant Submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput("");

    // Append User Message
    const userMsg = {
      id: `usr_${Date.now()}`,
      role: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsChatTyping(true);

    try {
      const historyPayload = chatMessages.slice(-5).map(m => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          userId: currentUser?.id || "usr_anonymous"
        })
      });
      const data = await response.json();
      setIsChatTyping(false);

      if (data.success) {
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            role: "model",
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setIsChatTyping(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: "model",
          text: "I am having trouble processing that right now. Feel free to contact our manual help center or search our templates database!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // AI Recommendation Trigger
  const handleGenerateRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiRecommending(true);
    setAiRecommendations([]);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          userId: currentUser?.id || "usr_anonymous"
        })
      });
      const data = await res.json();
      setIsAiRecommending(false);

      if (data.success && data.recommendations) {
        setAiRecommendations(data.recommendations);
        showToast("Personalized AI matches loaded!", "success");
      } else {
        showToast("Error generating AI recommendations.", "error");
      }
    } catch (err) {
      setIsAiRecommending(false);
      showToast("Recommendation API is taking too long. Please try again.", "error");
    }
  };

  // Submit Contact Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessageText) {
      showToast("All fields are required.", "error");
      return;
    }

    setIsSubmittingContact(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessageText
        })
      });
      const data = await res.json();
      setIsSubmittingContact(false);

      if (data.success) {
        showToast(data.message, "success");
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessageText("");
      } else {
        showToast(data.error || "Submission failed.", "error");
      }
    } catch (err) {
      setIsSubmittingContact(false);
      showToast("Connection issue. Could not submit message.", "error");
    }
  };

  // Admin Specific Actions Loader
  const loadAdminControlRoom = async () => {
    setAdminLoading(true);
    try {
      // Messages fetch
      const msgRes = await fetch("/api/contact");
      const msgData = await msgRes.json();
      if (msgData.success) {
        setAdminMessages(msgData.data);
      }

      // Simulated DB backup logs and system settings lists
      setAdminActivityLogs([
        { id: "1", userId: "usr_1", userName: "Demo Customer", action: "Viewed SaaS Landing page", timestamp: new Date(Date.now() - 1000 * 60 * 12).toLocaleString() },
        { id: "2", userId: "usr_admin", userName: "Admin Manager", action: "Accessed Settings Panel", timestamp: new Date(Date.now() - 1000 * 60 * 60).toLocaleString() },
        { id: "3", userId: "usr_1", userName: "Demo Customer", action: "Downloaded: AI Customer Playbook PDF", timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleString() }
      ]);

      setAdminAiLogs([
        { id: "1", userId: "usr_1", prompt: "I need a corporate branding layout", response: "Recommended Premium Corporate Branding System", type: "recommend", timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleString() },
        { id: "2", userId: "usr_1", prompt: "How to run promotions on free hosting?", response: "Boru AI: Explains awardspace/infinityfree configuration details.", type: "chat", timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleString() }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === "admin" && currentUser?.role === "admin") {
      setTimeout(() => {
        loadAdminControlRoom();
      }, 0);
    }
  }, [activePage, currentUser]);

  // Admin Message Reply
  const handleAdminReply = async (messageId: string, replyText: string) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          messageId,
          replyMessage: replyText
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reply sent & logged successfully!", "success");
        loadAdminControlRoom();
      }
    } catch (err) {
      showToast("Error saving message reply.", "error");
    }
  };

  // Admin New Asset Submit
  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName || !newAssetDesc) {
      showToast("Asset name and description are required", "error");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAssetName,
          type: newAssetType,
          description: newAssetDesc,
          category: newAssetCategory,
          price: newAssetPrice,
          isPremium: newAssetPremium,
          isFree: newAssetFree,
          downloadUrl: newAssetDownload,
          features: newAssetFeatures,
          tags: newAssetTags
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Resource "${newAssetName}" created and published live!`, "success");
        // Reset
        setNewAssetName("");
        setNewAssetDesc("");
        setNewAssetFeatures("");
        setNewAssetTags("");
        // Reload resources
        fetchResources();
      }
    } catch (err) {
      showToast("Failed to publish resource.", "error");
    }
  };

  // Database Backup Action Simulation (Export JSON file containing total system states)
  const handleExportBackup = () => {
    const backupPayload = {
      siteConfig: {
        platform: "DURE-BORU AI Platform",
        exportedAt: new Date().toISOString(),
        engine: "SQLite Abstraction Layer (Next.js Node memory schema)"
      },
      resources,
      users: [
        { id: "usr_1", name: "Demo Customer", role: "customer", points: 250 },
        { id: "usr_admin", name: "Admin Manager", role: "admin" }
      ],
      messages: adminMessages,
      activity: adminActivityLogs,
      aiLogs: adminAiLogs
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dureboru_db_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("SQLite / memory schema exported successfully as backup JSON file!", "success");
  };

  // Switch User Profile Simulation
  const handleSwitchUserRole = (role: "customer" | "admin") => {
    if (role === "admin") {
      setCurrentUser({
        id: "usr_admin",
        name: "Admin Manager",
        email: "admin@dureboru.com",
        role: "admin",
        avatar: "https://picsum.photos/seed/admin/200",
        createdAt: "2026-01-01T08:00:00Z",
        points: 9999
      });
      setActivePage("admin");
      showToast("Switched to Admin Control Session.", "info");
    } else {
      setCurrentUser({
        id: "usr_1",
        name: "Demo Customer",
        email: "customer@dureboru.com",
        role: "customer",
        avatar: "https://picsum.photos/seed/customer/200",
        createdAt: "2026-01-15T09:00:00Z",
        points: 250
      });
      setActivePage("dashboard");
      showToast("Switched to Customer Demo Session.", "info");
    }
  };

  // Log Out simulation
  const handleSignOut = () => {
    setCurrentUser(null);
    setActivePage("home");
    showToast("Signed out of your current session.", "info");
  };

  // Sign In submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!authEmail || !authPassword) {
      setAuthError("Email and password fields are required.");
      return;
    }

    try {
      const payload = authMode === "login" 
        ? { action: "login", email: authEmail, password: authPassword }
        : { action: "register", email: authEmail, name: authName, password: authPassword };

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.user);
        showToast(authMode === "login" ? "Successfully logged in!" : "Account created successfully!", "success");
        setAuthEmail("");
        setAuthPassword("");
        setAuthName("");
        setActivePage(data.user.role === "admin" ? "admin" : "dashboard");
      } else {
        setAuthError(data.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err) {
      setAuthError("Failed to authenticate. Running in offline demo mode.");
    }
  };

  // Filtering Resources List Helper
  const filteredAssets = resources.filter(r => {
    // Resource search match
    const searchMatch = searchQuery === "" || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Resource type match
    let typeMatch = true;
    if (selectedResourceType !== "All") {
      typeMatch = r.type === selectedResourceType.toLowerCase();
    } else {
      // Mapping default pages
      if (activePage === "products") typeMatch = r.type === "product";
      else if (activePage === "promotions") typeMatch = r.type === "promotion";
      else if (activePage === "creative-templates") typeMatch = r.type === "template" && r.category !== "Website Templates";
      else if (activePage === "website-templates") typeMatch = r.type === "template" && r.category === "Website Templates";
      else if (activePage === "ebook-library") typeMatch = r.type === "ebook";
      else if (activePage === "ai-tools") typeMatch = r.type === "aitool";
      else if (activePage === "free") typeMatch = r.isFree;
      else if (activePage === "premium") typeMatch = r.isPremium;
      else if (activePage === "directory") typeMatch = r.type === "website" || r.type === "aitool";
    }

    // Category match
    const categoryMatch = selectedCategory === "All" || r.category === selectedCategory;

    // Pricing filters
    const freeMatch = !filterFree || r.isFree;
    const premiumMatch = !filterPremium || r.isPremium;

    return searchMatch && typeMatch && categoryMatch && freeMatch && premiumMatch;
  }).sort((a, b) => {
    if (sortByPrice === "low-to-high") {
      return a.price - b.price;
    }
    if (sortByPrice === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  // Unique categories list
  const categoriesList = ["All", ...Array.from(new Set(resources.map(r => r.category)))];

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300 ${themeMode} ${themeMode === "dark" ? "bg-slate-950 text-slate-100" : "bg-[#F8F9FA] text-[#333333]"}`}>
      {/* Mesh Gradient Background Elements for Frosted Glass theme */}
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-[#0F4C81]/8 dark:bg-[#0F4C81]/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-[#00A86B]/8 dark:bg-[#00A86B]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute -bottom-24 left-1/4 w-[350px] h-[350px] bg-[#FFC107]/6 dark:bg-[#FFC107]/12 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 ${
              toast.type === "success" ? "bg-[#00A86B]" : toast.type === "error" ? "bg-rose-600" : "bg-[#0F4C81]"
            }`}
            id="toast-notification"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        themeMode === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-slate-200"
      }`} id="sticky-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => setActivePage("home")} className="flex items-center gap-3 group" id="logo-button">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#00A86B] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25 group-hover:rotate-6 transition-transform">
                DB
              </div>
              <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-[#0F4C81] to-[#00A86B] bg-clip-text text-transparent">
                DURE-BORU
              </span>
            </button>

            {/* Desktop Navbar menu */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <button
                onClick={() => setActivePage("home")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "home" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].home}
              </button>
              <button
                onClick={() => setActivePage("news-feed")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "news-feed" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].newsFeed}
              </button>
              <button
                onClick={() => setActivePage("about")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "about" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].about}
              </button>
              <button
                onClick={() => setActivePage("social-hub")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "social-hub" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].socialHub}
              </button>
              <button
                onClick={() => { setActivePage("products"); setSelectedResourceType("All"); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "products" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].products}
              </button>
              <button
                onClick={() => setActivePage("contact")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === "contact" ? "text-[#0F4C81] bg-[#0F4C81]/10 font-semibold" : "hover:text-[#0F4C81]"
                }`}
              >
                {translations[language].support}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={() => {
                const nextLang = language === "en" ? "om" : "en";
                setLanguage(nextLang);
                showToast(nextLang === "om" ? "Afaan Oromotti jijjiirameera! 🌳" : "Switched to English! 🇬🇧", "success");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all text-slate-800 dark:text-slate-100 shadow-sm"
              title="Switch Language / Qooqa Jijjiiri"
            >
              <Globe className="w-4 h-4 text-[#00A86B]" />
              <span>{translations[language].languageLabel}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
              className={`p-2 rounded-lg border transition-all ${
                themeMode === "dark" ? "bg-slate-800 border-slate-700 text-amber-400" : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
              title="Toggle theme mode"
              id="theme-toggle-button"
            >
              {themeMode === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Quick Demo Roler Toggles */}
            <div className="hidden xl:flex items-center gap-1 border rounded-lg p-1 bg-slate-100/50 dark:bg-slate-800/50 dark:border-slate-700">
              <button
                onClick={() => handleSwitchUserRole("customer")}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  currentUser?.role === "customer" ? "bg-white dark:bg-slate-900 shadow-sm text-[#0F4C81]" : "text-slate-500"
                }`}
              >
                Demo Cust
              </button>
              <button
                onClick={() => handleSwitchUserRole("admin")}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  currentUser?.role === "admin" ? "bg-white dark:bg-slate-900 shadow-sm text-[#00A86B]" : "text-slate-500"
                }`}
              >
                Demo Admin
              </button>
            </div>

            {/* Profile Avatar / Auth trigger */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivePage(currentUser.role === "admin" ? "admin" : "dashboard")}
                  className="flex items-center gap-2 border dark:border-slate-700 rounded-xl p-1 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  id="dashboard-avatar-btn"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold leading-none">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono capitalize">
                      {currentUser.role} • {currentUser.points} pts
                    </p>
                  </div>
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg border hover:bg-rose-50 text-rose-500 hover:border-rose-200 dark:border-slate-700 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setActivePage("contact"); setAuthMode("login"); }}
                className="px-4 py-2 rounded-xl bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-medium text-sm flex items-center gap-2 shadow-md shadow-primary/25"
                id="header-login-btn"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border dark:border-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 flex flex-col gap-3"
            >
              <button
                onClick={() => { setActivePage("home"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].home}
              </button>
              <button
                onClick={() => { setActivePage("news-feed"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].newsFeed}
              </button>
              <button
                onClick={() => { setActivePage("about"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].about}
              </button>
              <button
                onClick={() => { setActivePage("social-hub"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].socialHub}
              </button>
              <button
                onClick={() => { setActivePage("products"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].products}
              </button>
              <button
                onClick={() => { setActivePage("contact"); setIsMobileMenuOpen(false); }}
                className="text-left py-2 font-medium border-b dark:border-slate-800 text-slate-800 dark:text-slate-200"
              >
                {translations[language].support}
              </button>

              <button
                onClick={() => {
                  const nextLang = language === "en" ? "om" : "en";
                  setLanguage(nextLang);
                  setIsMobileMenuOpen(false);
                  showToast(nextLang === "om" ? "Afaan Oromotti jijjiirameera! 🌳" : "Switched to English! 🇬🇧", "success");
                }}
                className="flex items-center gap-2 py-2 font-bold text-left text-sm text-[#00A86B]"
              >
                <Globe className="w-4 h-4" />
                {translations[language].languageLabel}
              </button>

              <div className="flex justify-around bg-slate-100 dark:bg-slate-800 p-2 rounded-xl mt-2">
                <button onClick={() => { handleSwitchUserRole("customer"); setIsMobileMenuOpen(false); }} className="text-xs font-semibold">Demo Customer</button>
                <span className="text-slate-400">|</span>
                <button onClick={() => { handleSwitchUserRole("admin"); setIsMobileMenuOpen(false); }} className="text-xs font-semibold">Demo Admin</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* BODY ROUTER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              {/* HERO BANNER */}
              <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-16 sm:px-12 sm:py-24 shadow-2xl" id="hero-section">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-[#0F4C81]/40 mix-blend-multiply" />
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#00A86B]/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#0F4C81]/40 blur-3xl" />

                <div className="relative max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#00A86B]/20 border border-[#00A86B]/40 text-[#00A86B] px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase">
                    <Sparkles className="w-4 h-4 text-[#FFC107] animate-spin-slow" />
                    Now Enhanced with Gemini 3.5 AI
                  </div>
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                    {translations[language].heroTitlePart1}{" "}
                    <span className="bg-gradient-to-r from-[#00A86B] via-[#FFC107] to-cyan-400 bg-clip-text text-transparent">
                      {translations[language].heroTitlePart2}
                    </span>
                  </h1>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                    {translations[language].heroSub}
                  </p>

                  {/* Integrated Search Box */}
                  <div className="pt-4 max-w-lg">
                    <div className="relative flex items-center bg-white dark:bg-slate-800 text-[#333333] dark:text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                      <Search className="w-5 h-5 ml-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={translations[language].searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-4 text-sm bg-transparent outline-none border-none placeholder-slate-400 text-slate-800 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setActivePage("products");
                          }
                        }}
                      />
                      <button
                        onClick={() => setActivePage("products")}
                        className="bg-gradient-to-r from-[#0F4C81] to-[#00A86B] hover:opacity-90 text-white font-semibold text-sm px-6 py-4 transition-all flex items-center gap-2"
                      >
                        {translations[language].explore}
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                      <span>{translations[language].trending}</span>
                      <button onClick={() => { setSearchQuery("Bamboo"); setActivePage("products"); }} className="underline hover:text-white">Bamboo charging</button>
                      <button onClick={() => { setSearchQuery("Pitch Deck"); setActivePage("products"); }} className="underline hover:text-white">Pitch Deck</button>
                      <button onClick={() => { setSearchQuery("Playbook"); setActivePage("products"); }} className="underline hover:text-white">AI Support Playbook</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* STATS SECTION */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="statistics-section">
                {[
                  { value: "2,500+", label: "Active Enterprise Clients", color: "text-[#0F4C81]" },
                  { value: "500+", label: "Verified Digital Assets", color: "text-[#00A86B]" },
                  { value: "15K+", label: "Completed Resource Downloads", color: "text-[#FFC107]" },
                  { value: "99.9%", label: "AI Translation Accuracy", color: "text-indigo-500" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl glass-card text-center space-y-1">
                    <h3 className={`text-3xl font-extrabold font-display ${stat.color}`}>{stat.value}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </section>

              {/* INTEGRATED GEMINI RECOMENDER PORTAL */}
              <section className="rounded-3xl border border-[#0F4C81]/20 bg-gradient-to-b from-[#0F4C81]/5 to-[#00A86B]/5 p-8 sm:p-12 space-y-8">
                <div className="max-w-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#0F4C81] font-bold text-sm tracking-wide uppercase">
                    <Sparkles className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" />
                    Intelligent Customer AI Recommendations
                  </div>
                  <h2 className="font-display font-bold text-3xl">What are your project goals today?</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Enter details about your launching business, budget constraints, or target audience. Our AI engine will analyze our entire catalogue of corporate giftware, marketing presentation templates, Next.js code folders, and translation tools to deliver perfect matching assets!
                  </p>
                </div>

                <form onSubmit={handleGenerateRecommendations} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g. I am starting a digital design studio and need matching client proposals, corporate water bottles, and free e-books."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-grow px-5 py-4 rounded-2xl border dark:border-slate-700 dark:bg-slate-800 outline-none focus:border-[#0F4C81] shadow-inner text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isAiRecommending}
                    className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 disabled:opacity-75 text-white font-semibold rounded-2xl px-8 py-4 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shrink-0 text-sm"
                  >
                    {isAiRecommending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#FFC107]" />
                        Generate Match
                      </>
                    )}
                  </button>
                </form>

                {/* AI RECOMMENDATION GRID */}
                <AnimatePresence>
                  {aiRecommendations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-6 space-y-4"
                    >
                      <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400">Perfect AI Matches Located ({aiRecommendations.length}):</h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        {aiRecommendations.map((rec) => (
                          <div
                            key={rec.id}
                            className={`flex flex-col justify-between p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 relative hover:shadow-lg transition-shadow`}
                          >
                            <span className="absolute top-3 right-3 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-[10px] font-bold font-mono flex items-center gap-1">
                              <Sparkles className="w-3 h-3 fill-emerald-500" /> Match Approved
                            </span>
                            <div className="space-y-3">
                              <p className="text-xs text-slate-400 capitalize">{rec.type} • {rec.category}</p>
                              <h5 className="font-bold font-display text-lg leading-snug">{rec.name}</h5>
                              <p className="text-xs text-slate-500 line-clamp-3">{rec.description}</p>
                              <div className="bg-[#0F4C81]/5 p-3 rounded-xl border border-primary/10">
                                <p className="text-[11px] font-medium leading-relaxed italic text-[#0F4C81] dark:text-[#00A86B]">
                                  &quot;{rec.aiReason}&quot;
                                </p>
                              </div>
                            </div>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between mt-4">
                              <span className="font-extrabold text-sm text-[#0F4C81] dark:text-emerald-400">
                                {rec.isFree ? "FREE" : `$${rec.price}`}
                              </span>
                              <button
                                onClick={() => setSelectedDetailAsset(rec)}
                                className="text-xs font-semibold hover:underline flex items-center gap-1"
                              >
                                View Asset <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* THREE CORE SECTOR TILES */}
              <section className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="font-display font-bold text-3xl">Explore Active Resource Categories</h2>
                  <p className="text-slate-500 max-w-xl mx-auto text-sm">Access professional corporate collateral, customized hardware gifts, editable Figma sets, or modern NextJS boilerplate code.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Custom Promotional Goods",
                      desc: "Sustainable laser-engraved bamboo charge docks, thermal hydro-flasks, and recycled felt sleeves made to elevate team corporate identity.",
                      action: "Browse Goods",
                      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
                      page: "products"
                    },
                    {
                      title: "Premium Design & Slide Templates",
                      desc: "Clean startup investor pitch decks, brand styling guidelines, and fully responsive Figma layouts formatted for quick personalization.",
                      action: "View Templates",
                      icon: <Layout className="w-6 h-6 text-[#0F4C81]" />,
                      page: "creative-templates"
                    },
                    {
                      title: "E-Books & Business Guides",
                      desc: "Informative handbooks covering modern customer support training, digital scaling funnels, and enterprise support optimization scripts.",
                      action: "Read Books",
                      icon: <BookOpen className="w-6 h-6 text-[#FFC107]" />,
                      page: "ebook-library"
                    }
                  ].map((tile, idx) => (
                    <div key={idx} className="p-8 rounded-3xl glass-card hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-6 shadow-sm">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {tile.icon}
                        </div>
                        <h3 className="font-display font-bold text-xl">{tile.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tile.desc}</p>
                      </div>
                      <button
                        onClick={() => setActivePage(tile.page)}
                        className="text-sm font-semibold text-[#0F4C81] hover:text-[#0F4C81]/80 flex items-center gap-2 group w-fit"
                      >
                        {tile.action}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SPECIAL PROMOTIONS / VALUE CARDS */}
              <section className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl overflow-hidden glass-card shadow-lg">
                <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px]">
                  <img
                    src="https://picsum.photos/seed/promo/800/600"
                    alt="Launch Offer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white space-y-1">
                    <span className="text-xs font-mono font-bold text-[#FFC107] uppercase">Hot Summer Promo</span>
                    <h3 className="font-display font-bold text-2xl">Save 25% On Pro Items</h3>
                  </div>
                </div>
                <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-3xl">Claim Your Summer Coupon!</h3>
                    <p className="text-sm text-slate-500">
                      Copy our official launch coupon code below to unlock massive discounts across our entire catalogue of premium Next.js agency themes, Figma brand identity packs, and e-books.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl border dark:border-slate-700 w-fit">
                    <span className="font-mono font-bold text-lg text-[#0F4C81] dark:text-emerald-400 tracking-wider">DURELAUNCH</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("DURELAUNCH");
                        setCopiedCode("DURELAUNCH");
                        showToast("Coupon code 'DURELAUNCH' copied to clipboard!", "success");
                        setTimeout(() => setCopiedCode(null), 3000);
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border dark:border-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1 text-xs"
                    >
                      {copiedCode === "DURELAUNCH" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" /> Valid for all Premium assets
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" /> One-click copy & claim
                    </div>
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS SECTION */}
              <section className="space-y-8" id="testimonials-section">
                <div className="text-center space-y-2">
                  <h2 className="font-display font-bold text-3xl">What Digital Creators Are Saying</h2>
                  <p className="text-slate-500 text-sm max-w-lg mx-auto">See how DureBoru customer service AI and promotional gift sets transform product launches.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      quote: "We ordered 200 laser-etched Bamboo Charging stations for our Series A celebration. The quality was exquisite, and their Boru AI chat recommended the exact e-books we needed to structure our CRM onboarding process.",
                      author: "Jennifer Lee",
                      title: "COO, Zenith Tech",
                      avatar: "https://picsum.photos/seed/jenny/100"
                    },
                    {
                      quote: "Their Pitch Deck template and SaaS dark landing code saved us weeks of engineering. Simply copy-pasted and customized. Plus, they earned my absolute respect for having an easily navigable, premium, fast design.",
                      author: "Marc Verner",
                      title: "Founder, LaunchFlow Agency",
                      avatar: "https://picsum.photos/seed/marc/100"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-8 rounded-3xl glass-card space-y-6 shadow-sm">
                      <div className="flex gap-1 text-[#FFC107]">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FFC107]" />)}
                      </div>
                      <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-sm">{item.author}</h4>
                          <p className="text-xs text-slate-400 font-mono">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* NEWSLETTER SECTION */}
              <section className="rounded-3xl bg-gradient-to-tr from-[#0F4C81] to-[#00A86B] text-white p-8 sm:p-12 text-center space-y-6" id="newsletter-section">
                <div className="max-w-xl mx-auto space-y-3">
                  <h2 className="font-display font-bold text-3xl">Join the DURE-BORU Newsletter</h2>
                  <p className="text-slate-200 text-sm">
                    Get bi-weekly notifications containing premium free templates, e-book drops, digital guides, and newly launched AI business software directly in your mailbox.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="flex bg-white dark:bg-slate-900 rounded-2xl overflow-hidden p-1.5 shadow-xl border border-white/20">
                    <input
                      type="email"
                      placeholder="Enter your work email address"
                      className="w-full bg-transparent px-4 py-3 outline-none text-slate-800 dark:text-white text-sm"
                    />
                    <button
                      onClick={() => showToast("Subscription confirmed! Welcome to DureBoru newsletter list.", "success")}
                      className="bg-slate-900 dark:bg-[#00A86B] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-all shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-200 mt-2 font-mono">No spam. Unsubscribe at any time.</p>
                </div>
              </section>
            </motion.div>
          )}

          {/* DYNAMIC ASSET DIRECTORY (Products, Templates, E-books, AI Tools) */}
          {["products", "creative-templates", "website-templates", "ebook-library", "ai-tools", "free", "premium", "directory"].includes(activePage) && (
            <motion.div
              key={activePage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Breadcrumb Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="hover:underline cursor-pointer" onClick={() => setActivePage("home")}>Home</span>
                  <span>/</span>
                  <span className="capitalize text-slate-600 dark:text-white font-semibold">{activePage.replace("-", " ")}</span>
                </div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl capitalize tracking-tight">
                  {activePage.replace("-", " ")} Catalog
                </h1>
                <p className="text-slate-500 text-sm max-w-2xl">
                  Filter through our premium collection. Earn points by downloading items or leaving ratings. Talk to Boru AI in the corner at any time to locate resources.
                </p>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4 relative">
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filter current results..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl outline-none focus:border-[#0F4C81] text-sm shadow-sm"
                  />
                </div>

                <div className="md:col-span-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border dark:border-slate-800 px-4 py-3 rounded-xl outline-none text-sm text-slate-600 dark:text-slate-300 shadow-sm"
                  >
                    <option value="All">All Categories</option>
                    {categoriesList.filter(c => c !== "All").map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <select
                    value={sortByPrice}
                    onChange={(e) => setSortByPrice(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-900 border dark:border-slate-800 px-4 py-3 rounded-xl outline-none text-sm text-slate-600 dark:text-slate-300 shadow-sm"
                  >
                    <option value="none">{translations[language].sortBy}: {translations[language].sortDefault}</option>
                    <option value="low-to-high">{translations[language].priceLowHigh}</option>
                    <option value="high-to-low">{translations[language].priceHighLow}</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-center justify-between gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterFree}
                        onChange={(e) => setFilterFree(e.target.checked)}
                        className="rounded border-slate-300 text-[#0F4C81] focus:ring-[#0F4C81]"
                      />
                      Free
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterPremium}
                        onChange={(e) => setFilterPremium(e.target.checked)}
                        className="rounded border-slate-300 text-[#0F4C81] focus:ring-[#0F4C81]"
                      />
                      Premium
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSortByPrice("none");
                      setFilterFree(false);
                      setFilterPremium(false);
                    }}
                    className="text-xs text-rose-500 hover:underline shrink-0"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* ASSET GRID */}
              {loadingResources ? (
                <div className="grid md:grid-cols-3 gap-8 py-12" id="skeleton-loading">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-4">
                      <div className="bg-slate-200 dark:bg-slate-800 h-48 rounded-3xl" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredAssets.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed dark:border-slate-800 rounded-3xl space-y-4">
                  <Sparkles className="w-12 h-12 text-[#FFC107] mx-auto animate-bounce" />
                  <h3 className="font-display font-bold text-xl">No assets matched your filter configuration</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">
                    Try searching something broader or click &ldquo;Clear Filters&rdquo; to reset. You can also prompt Boru AI in the bottom right corner for immediate concierging!
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAssets.map((asset) => (
                    <motion.div
                      layout
                      key={asset.id}
                      className="rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all glass-card shadow-sm"
                      id={`asset-card-${asset.id}`}
                    >
                      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                        <img
                          src={asset.imageUrl}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wider uppercase text-white ${
                            asset.isPremium ? "bg-[#FFC107]" : "bg-[#00A86B]"
                          }`}>
                            {asset.isPremium ? "Premium" : "Free"}
                          </span>
                          {asset.type === "ebook" && (
                            <span className="bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[9px] font-semibold font-mono">
                              {asset.pages} Pages
                            </span>
                          )}
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          onClick={() => handleToggleFavorite(asset)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 hover:scale-110 transition-transform shadow-md"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${
                            favorites.includes(asset.id) ? "text-rose-500 fill-rose-500" : "text-slate-500"
                          }`} />
                        </button>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold font-mono tracking-wider uppercase text-[#0F4C81] dark:text-[#00A86B]">
                            {asset.category}
                          </p>
                          <h3 className="font-display font-bold text-xl leading-tight line-clamp-1 hover:underline cursor-pointer" onClick={() => setSelectedDetailAsset(asset)}>
                            {asset.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                            {asset.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {asset.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
                            <span className="font-bold">{asset.rating}</span>
                            <span className="text-slate-400">({asset.ratingsCount || 0})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedDetailAsset(asset)}
                              className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleDownload(asset)}
                              className="px-3 py-1.5 rounded-lg bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs font-semibold flex items-center gap-1 shadow-sm"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Get
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ABOUT US VIEW */}
          {activePage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              {/* Cover Banner */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F4C81] to-[#00A86B] text-white p-8 md:p-16 shadow-xl">
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px]" />
                <div className="relative max-w-3xl space-y-4">
                  <span className="bg-white/20 text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                    {translations[language].about}
                  </span>
                  <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
                    {translations[language].aboutHeading}
                  </h1>
                  <p className="text-slate-100 text-sm md:text-lg max-w-xl leading-relaxed">
                    {translations[language].aboutTagline}
                  </p>
                </div>
              </div>

              {/* Story Grid */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800 dark:text-slate-100 border-l-4 border-[#0F4C81] pl-4">
                    {translations[language].aboutHeading}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {translations[language].aboutParagraph1}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {translations[language].aboutParagraph2}
                  </p>
                </div>
                <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-lg">
                  <img
                    src="https://picsum.photos/seed/aboutus/800/600"
                    alt="DureBoru Hub"
                    className="w-full h-full object-cover animate-pulse-slow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-xs text-slate-300 font-mono">DureBoru Localized Innovation Hub © 2026</p>
                  </div>
                </div>
              </div>

              {/* Core Values / Pillars */}
              <div className="space-y-6">
                <h3 className="font-display font-bold text-2xl text-center text-slate-800 dark:text-slate-100">
                  {translations[language].coreValues}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">{translations[language].value1Title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{translations[language].value1Desc}</p>
                  </div>

                  <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00A86B]/10 flex items-center justify-center text-[#00A86B]">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">{translations[language].value2Title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{translations[language].value2Desc}</p>
                  </div>

                  <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFC107]/10 flex items-center justify-center text-[#FFC107]">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">{translations[language].value3Title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{translations[language].value3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Leadership Team Section */}
              <div className="space-y-6 pt-6">
                <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">
                  {translations[language].ourTeam}
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { name: "Sarah Dure", role: "AI Lead, DureBoru", seed: "sarah", bio: "Fluent in LLM optimization & natural language localized translation." },
                    { name: "Dr. Han Boru", role: "Design Lead, DureBoru", seed: "han", bio: "Start-up layout branding and digital assets curate master." },
                    { name: "Tolosa Kenesa", role: "Local Tech Dev, DureBoru", seed: "tolosa", bio: "Connecting bilingual services to interactive high-performance frontends." }
                  ].map((member, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden glass-card shadow-sm border border-slate-200 dark:border-slate-800">
                      <img src={`https://picsum.photos/seed/${member.seed}/300/300`} alt={member.name} className="w-full h-48 object-cover" />
                      <div className="p-5 space-y-2">
                        <h4 className="font-display font-bold text-base leading-none">{member.name}</h4>
                        <p className="text-[10px] text-[#00A86B] font-mono uppercase font-bold">{member.role}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* COMMUNITY NEWS FEED VIEW */}
          {activePage === "news-feed" && (
            <motion.div
              key="news-feed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h1 className="font-display font-bold text-4xl flex items-center gap-3">
                  <Newspaper className="w-8 h-8 text-[#0F4C81]" />
                  {translations[language].newsHeading}
                </h1>
                <p className="text-slate-500 text-sm max-w-xl">{translations[language].newsSub}</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left side: Post creator & list */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Create Post Card */}
                  <div className="p-6 rounded-3xl glass-card space-y-4 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex gap-3">
                      <img
                        src={currentUser?.avatar || "https://picsum.photos/seed/customer/100"}
                        alt="My Profile"
                        className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                      />
                      <div className="flex-grow">
                        <p className="text-xs font-semibold leading-none">{currentUser?.name || "Anonymous"}</p>
                        <p className="text-[10px] text-slate-400 capitalize">{currentUser?.role || "Guest"}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <textarea
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder={translations[language].writePostPlaceholder}
                        rows={3}
                        className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C81]/30 transition-all text-slate-800 dark:text-slate-100 border dark:border-slate-800"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-mono">Bilingual support active</span>
                        <button
                          onClick={() => {
                            if (!newPostText.trim()) return;
                            const newFeedItem = {
                              id: `fp_${Date.now()}`,
                              author: currentUser?.name || "Demo Customer",
                              avatar: currentUser?.avatar || "https://picsum.photos/seed/customer/100",
                              role: currentUser?.role === "admin" ? "Verified Admin" : "Community Member",
                              time: "Just now",
                              textEn: newPostText,
                              textOm: newPostText, // fallback
                              likes: 0,
                              liked: false,
                              comments: []
                            };
                            setFeedPosts([newFeedItem, ...feedPosts]);
                            setNewPostText("");
                            showToast(translations[language].postSuccess, "success");
                          }}
                          className="px-5 py-2 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {translations[language].btnPost}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Feed List */}
                  <div className="space-y-6">
                    {feedPosts.map((post) => (
                      <div key={post.id} className="p-6 rounded-3xl glass-card space-y-4 shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex gap-3 justify-between items-start">
                          <div className="flex gap-3">
                            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-sm">{post.author}</h4>
                                <span className="bg-slate-100 dark:bg-slate-800 text-[8px] font-mono px-1.5 py-0.5 rounded text-slate-500 uppercase">{post.role}</span>
                              </div>
                              <p className="text-[10px] text-slate-400">{post.time}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              showToast(translations[language].copiedLink, "success");
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title={translations[language].share}
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Text: show language-specific fallback */}
                        <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed space-y-2">
                          <p>{language === "en" ? post.textEn : post.textOm}</p>
                          {language === "om" && post.textOm !== post.textEn && (
                            <p className="text-xs text-slate-400 font-mono italic">Ingiliffaan: {post.textEn}</p>
                          )}
                          {language === "en" && post.textOm !== post.textEn && (
                            <p className="text-xs text-slate-400 font-mono italic">Afaan Oromootiin: {post.textOm}</p>
                          )}
                        </div>

                        {/* Like & Share Action row */}
                        <div className="flex items-center gap-4 pt-2 border-t dark:border-slate-800 text-xs">
                          <button
                            onClick={() => {
                              setFeedPosts(feedPosts.map(p => {
                                if (p.id === post.id) {
                                  return {
                                    ...p,
                                    liked: !p.liked,
                                    likes: p.liked ? p.likes - 1 : p.likes + 1
                                  };
                                }
                                return p;
                              }));
                            }}
                            className={`flex items-center gap-1.5 transition-all font-semibold ${
                              post.liked ? "text-[#00A86B]" : "text-slate-400 hover:text-slate-600"
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${post.liked ? "fill-[#00A86B]" : ""}`} />
                            <span>{post.likes} {translations[language].likes}</span>
                          </button>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <span className="text-slate-400 font-medium">
                            {post.comments.length} {translations[language].comments}
                          </span>
                        </div>

                        {/* Comments section */}
                        {post.comments.length > 0 && (
                          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl space-y-3 text-xs border border-slate-100 dark:border-slate-800/40">
                            {post.comments.map((comment: any, cIdx: number) => (
                              <div key={cIdx} className="space-y-1">
                                <p className="font-bold text-slate-800 dark:text-slate-200">{comment.author}</p>
                                <p className="text-slate-500 dark:text-slate-400">{comment.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Write custom comment */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const input = form.elements.namedItem("commentText") as HTMLInputElement;
                            if (!input.value.trim()) return;
                            const commentText = input.value;
                            setFeedPosts(feedPosts.map(p => {
                              if (p.id === post.id) {
                                return {
                                  ...p,
                                  comments: [...p.comments, { author: currentUser?.name || "Demo Customer", text: commentText }]
                                };
                              }
                              return p;
                            }));
                            input.value = "";
                            showToast("Comment published!", "success");
                          }}
                          className="flex gap-2"
                        >
                          <input
                            type="text"
                            name="commentText"
                            placeholder={translations[language].commentPlaceholder}
                            className="flex-grow px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 outline-none focus:border-[#0F4C81] border dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200"
                          />
                          <button
                            type="submit"
                            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold rounded-xl text-xs text-slate-700 dark:text-slate-200"
                          >
                            {translations[language].btnComment}
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Sidebar widgets */}
                <div className="lg:col-span-4 space-y-6">
                  {/* About community Widget */}
                  <div className="p-6 rounded-3xl glass-card space-y-4 border border-slate-200 dark:border-slate-800 text-xs">
                    <h3 className="font-display font-bold text-sm flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#00A86B]" />
                      About Community Feed
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      This news feed aggregates technical insights, start-up layout news, corporate gifts catalogs, and AI developments. Language translation is automatically handled for English and Afan Oromo!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SOCIAL MEDIA HUB VIEW */}
          {activePage === "social-hub" && (
            <motion.div
              key="social-hub"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h1 className="font-display font-bold text-4xl flex items-center gap-3">
                  <Globe className="w-8 h-8 text-[#00A86B]" />
                  {translations[language].socialHeading}
                </h1>
                <p className="text-slate-500 text-sm max-w-2xl">{translations[language].socialSub}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    id: "facebook",
                    name: "Facebook",
                    channel: "DureBoru Official",
                    url: "https://facebook.com/dureboru",
                    color: "bg-[#1877F2]/10 dark:bg-[#1877F2]/20 border-[#1877F2]/30 text-[#1877F2]",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                      </svg>
                    ),
                    desc: "Follow our page for creative digital asset spotlights & startup pitch checklists."
                  },
                  {
                    id: "telegram",
                    name: "Telegram",
                    channel: "DureBoru Hub (@dureboru)",
                    url: "https://t.me/dureboru",
                    color: "bg-[#0088cc]/10 dark:bg-[#0088cc]/20 border-[#0088cc]/30 text-[#0088cc]",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.25-5.59 3.69-.53.36-1 .54-1.42.53-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.41-1.4-.87.03-.24.36-.49.99-.75 3.88-1.69 6.47-2.8 7.78-3.32 3.7-1.47 4.47-1.73 4.97-1.74.11 0 .36.03.52.16.14.11.18.26.2.37.03.11.02.32.01.37z"/>
                      </svg>
                    ),
                    desc: "Join our community group to request personalized code help & translation assistance."
                  },
                  {
                    id: "youtube",
                    name: "YouTube",
                    channel: "DureBoru Academy",
                    url: "https://youtube.com/c/dureboru",
                    color: "bg-[#FF0000]/10 dark:bg-[#FF0000]/20 border-[#FF0000]/30 text-[#FF0000]",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.582 6.186a2.69 2.69 0 00-1.888-1.898C18.02 3.75 12 3.75 12 3.75s-6.02 0-7.694.538a2.69 2.69 0 00-1.888 1.898C2 7.86 2 12 2 12s0 4.14.538 5.814a2.69 2.69 0 001.888 1.898c1.674.538 7.694.538 7.694.538s6.02 0 7.694-.538a2.69 2.69 0 001.888-1.898C22 16.14 22 12 22 12s0-4.14-.538-5.814zM9.745 15.119V8.881L15.181 12l-5.436 3.119z"/>
                      </svg>
                    ),
                    desc: "Watch high-quality step-by-step videos about Figma design and smart AI tools integration."
                  },
                  {
                    id: "tiktok",
                    name: "TikTok",
                    channel: "@dureborutech",
                    url: "https://tiktok.com/@dureborutech",
                    color: "bg-[#EE1D52]/10 dark:bg-[#69C9D0]/15 border-slate-700 text-slate-800 dark:text-white",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95.84 2.17 1.34 3.44 1.48v3.91c-1.34-.02-2.65-.4-3.79-1.1-.38-.25-.72-.55-1.02-.89V14.2c.04 4.16-2.58 7.82-6.52 9.07-3.94 1.26-8.32-.47-10.4-4.17-2.08-3.7-1.18-8.49 2.12-11.19a7.65 7.65 0 015.39-1.42c.01 1.43 0 2.86.01 4.29-1.28-.18-2.6.22-3.53 1.13-.93.91-1.33 2.27-1.06 3.54.27 1.28 1.21 2.31 2.45 2.69a4.23 4.23 0 005.15-2.5c.14-.42.2-1.35.19-2.03V.02h2.52z"/>
                      </svg>
                    ),
                    desc: "Catch short micro-tips about automated workflows and physical corporate gift design."
                  }
                ].map((plat) => {
                  const isVerified = socialStatus[plat.id];
                  return (
                    <div key={plat.id} className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg transition-all">
                      <div className="space-y-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plat.color} shadow-sm`}>
                          {plat.icon}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg">{plat.name}</h3>
                          <p className="text-xs text-slate-400 font-mono">{plat.channel}</p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plat.desc}</p>
                      </div>

                      <button
                        onClick={() => handleVerifySocialChannel(plat.id)}
                        disabled={isVerified}
                        className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          isVerified 
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 cursor-default" 
                            : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 active:scale-[0.98]"
                        }`}
                      >
                        {isVerified ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                            {translations[language].verified}
                          </>
                        ) : (
                          <>
                            <Globe className="w-4 h-4 animate-spin-slow" />
                            {translations[language].unverified}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Extra connection verification rewards guidelines */}
              <div className="p-8 rounded-3xl bg-gradient-to-tr from-[#0F4C81]/10 to-[#00A86B]/10 border border-[#0F4C81]/20 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2 text-slate-800 dark:text-white">
                    <Award className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" />
                    Points System & Premium Catalog Access
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                    By verifying your social engagement, you immediately receive 100 points per platform. These points can be used to unlock premium template source directories, download e-books, or access expert AI tools completely free!
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-xs text-slate-400 block font-mono">Current Points Bal:</span>
                  <span className="text-3xl font-black text-[#0F4C81] dark:text-[#00A86B]">{currentUser?.points || 0} pts</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* BLOG LIST VIEW */}
          {activePage === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h1 className="font-display font-bold text-4xl">DureBoru Insights & News</h1>
                <p className="text-slate-500 text-sm max-w-xl">Learn how AI, digital asset distribution, and design automation combine to streamline your project pipelines.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    id: "blog_1",
                    title: "How Generative AI is Revolutionizing Personalized Business Promotions",
                    summary: "Discover how deep learning and semantic embeddings are enabling businesses to target individual client needs with custom-crafted promotional resources.",
                    author: "Sarah Dure",
                    role: "AI Lead, Dure-Boru",
                    imageUrl: "https://picsum.photos/seed/aiblog/800/400",
                    tags: ["AI Tools", "SaaS Growth"],
                    createdAt: "2026-07-01",
                    read: "5 min read"
                  },
                  {
                    id: "blog_2",
                    title: "5 Crucial Digital Templates Every Launching Startup Needs in 2026",
                    summary: "From brand standards to clean venture presentations, discover the foundational visual assets that establish corporate credibility.",
                    author: "Dr. Han Boru",
                    role: "Design Lead, Dure-Boru",
                    imageUrl: "https://picsum.photos/seed/templatesblog/800/400",
                    tags: ["Design Guidelines", "Venture Pitch"],
                    createdAt: "2026-07-05",
                    read: "7 min read"
                  }
                ].map((post) => (
                  <div key={post.id} className="rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between glass-card shadow-sm">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6 space-y-4">
                      <div className="flex gap-2">
                        {post.tags.map((t, idx) => (
                          <span key={idx} className="bg-[#0F4C81]/10 text-[#0F4C81] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-display font-bold text-xl leading-tight hover:underline cursor-pointer">{post.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{post.summary}</p>
                      
                      <div className="flex items-center gap-3 pt-4 border-t dark:border-slate-800">
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs uppercase text-[#0F4C81]">
                          {post.author[0]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold leading-none">{post.author}</p>
                          <p className="text-[10px] text-slate-400">{post.role} • {post.read}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT & MANUAL CONCIERGE (Includes Login/Register Auth forms) */}
          {activePage === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Form Auth Panel */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-3xl glass-card space-y-6">
                  <div className="flex border-b dark:border-slate-800 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                      onClick={() => setAuthMode("login")}
                      className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                        authMode === "login" ? "bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white" : "text-slate-400"
                      }`}
                    >
                      Login Account
                    </button>
                    <button
                      onClick={() => setAuthMode("register")}
                      className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                        authMode === "register" ? "bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white" : "text-slate-400"
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <h3 className="font-display font-bold text-xl">
                      {authMode === "login" ? "Welcome Back!" : "Register Profile"}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      {authMode === "login" 
                        ? "Log in to check rewards points, favorites, and downloaded files history." 
                        : "Unlock 100 free download points immediately on sign up."}
                    </p>

                    {authError && (
                      <div className="p-3 bg-rose-50 text-rose-500 rounded-lg text-xs font-medium">
                        {authError}
                      </div>
                    )}

                    {authMode === "register" && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full border dark:border-slate-800 dark:bg-slate-800 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Email Address</label>
                      <input
                        type="email"
                        placeholder="customer@dureboru.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full border dark:border-slate-800 dark:bg-slate-800 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full border dark:border-slate-800 dark:bg-slate-800 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-semibold rounded-xl p-3.5 text-sm shadow-md"
                    >
                      {authMode === "login" ? "Sign In" : "Register Now"}
                    </button>
                  </form>

                  <div className="pt-4 border-t dark:border-slate-800 text-center text-xs text-slate-500">
                    <p>Demo Account Quick Fill credentials:</p>
                    <p className="font-mono mt-1 font-bold">customer@dureboru.com / password</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <h1 className="font-display font-bold text-4xl">Support & Concierge Center</h1>
                  <p className="text-slate-500 text-sm">
                    Have bulk customized corporate order requests or specific digital licensing queries? Submit your details directly to the DURE-BORU administrative support inbox.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Your Name</label>
                      <input
                        type="text"
                        placeholder="James Wilson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full border dark:border-slate-800 dark:bg-slate-900 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Your Email Address</label>
                      <input
                        type="email"
                        placeholder="james@agency.io"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full border dark:border-slate-800 dark:bg-slate-900 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Subject Inquiry</label>
                    <input
                      type="text"
                      placeholder="e.g., Bulk customized Bamboo dock order inquiry"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full border dark:border-slate-800 dark:bg-slate-900 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Inquiry Message Detail</label>
                    <textarea
                      placeholder="Provide full description of your product customization requests, licenses, or platform needs..."
                      value={contactMessageText}
                      onChange={(e) => setContactMessageText(e.target.value)}
                      rows={5}
                      className="w-full border dark:border-slate-800 dark:bg-slate-900 rounded-xl p-3 text-sm focus:border-[#0F4C81] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="bg-[#00A86B] hover:bg-[#00A86B]/90 text-white font-semibold px-8 py-3.5 rounded-xl disabled:opacity-75 text-sm flex items-center gap-2"
                  >
                    {isSubmittingContact ? "Submitting Inquiry..." : "Submit Message Request"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t dark:border-slate-800">
                  <div className="flex gap-3 text-xs">
                    <Mail className="w-5 h-5 text-[#0F4C81] shrink-0" />
                    <div>
                      <p className="font-semibold">Support Mailbox</p>
                      <p className="text-slate-400">support@dureboru.com</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <Phone className="w-5 h-5 text-[#00A86B] shrink-0" />
                    <div>
                      <p className="font-semibold">Hotline Desk</p>
                      <p className="text-slate-400">+82 2-1234-5678</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <p className="font-semibold">Headquarters</p>
                      <p className="text-slate-400">Seoul, South Korea</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CUSTOMER DASHBOARD */}
          {activePage === "dashboard" && currentUser && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header profile cards */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center p-8 rounded-3xl glass-card">
                <div className="flex items-center gap-4">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="space-y-1">
                    <h2 className="font-display font-bold text-2xl">{currentUser.name}</h2>
                    <p className="text-xs text-slate-400">Customer ID: {currentUser.id} • Registered since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-tr from-[#0F4C81] to-[#00A86B] text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-primary/20">
                  <Award className="w-8 h-8 text-[#FFC107] fill-[#FFC107]" />
                  <div>
                    <p className="text-xs text-slate-100 font-medium">Reward Points Balance</p>
                    <p className="text-2xl font-extrabold font-mono">{currentUser.points} Pts</p>
                  </div>
                </div>
              </div>

              {/* Favorites & Downloads sections */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Bookmarks Favorites */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-display font-bold text-xl flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    Your Saved Bookmarks ({favorites.length})
                  </h3>

                  {favorites.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
                      You haven&apos;t added any resources to your favorites yet. Explore our templates or products catalog and tap the heart icon!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {resources.filter(r => favorites.includes(r.id)).map(asset => (
                        <div key={asset.id} className="p-4 rounded-2xl glass-card flex justify-between items-center text-xs">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{asset.type}</span>
                            <h4 className="font-bold text-sm">{asset.name}</h4>
                            <p className="text-slate-400 text-[11px] line-clamp-1">{asset.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setSelectedDetailAsset(asset)} className="p-2 border dark:border-slate-800 rounded-lg">View</button>
                            <button onClick={() => handleDownload(asset)} className="bg-[#0F4C81] text-white p-2 rounded-lg flex items-center gap-1"><Download className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Downloads history */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-display font-bold text-xl flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#0F4C81]" />
                    Download History Logs ({downloads.length})
                  </h3>

                  {downloads.length === 0 ? (
                    <div className="p-8 text-center border border-dashed dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
                      No downloads logged yet. Standard assets can be downloaded directly!
                    </div>
                  ) : (
                    <div className="glass-card rounded-2xl p-4 space-y-3">
                      {resources.filter(r => downloads.includes(r.id)).map((asset, i) => (
                        <div key={i} className="flex items-center gap-3 border-b last:border-none pb-2 last:pb-0 text-xs">
                          <BookOpen className="w-5 h-5 text-[#0F4C81] shrink-0" />
                          <div className="flex-grow">
                            <p className="font-semibold leading-none">{asset.name}</p>
                            <p className="text-[10px] text-slate-400 mt-1">Resource saved successfully • +20 points awarded</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ADMIN CONTROL PANEL */}
          {activePage === "admin" && currentUser?.role === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header admin stats */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 rounded-3xl bg-slate-900 text-white gap-4">
                <div className="space-y-1">
                  <h2 className="font-display font-bold text-3xl">Admin Control Center</h2>
                  <p className="text-xs text-slate-400">Manage digital templates, customized bamboo goods, and analyze system telemetry logs.</p>
                </div>
                <button
                  onClick={handleExportBackup}
                  className="bg-[#00A86B] hover:bg-[#00A86B]/90 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  Backup SQLite Schema
                </button>
              </div>

              {/* Add asset & Inbox grids */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Publish Resource form */}
                <div className="lg:col-span-5 p-6 rounded-2xl glass-card space-y-4">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#0F4C81]" />
                    Publish Digital Resource
                  </h3>

                  <form onSubmit={handleCreateAsset} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-500">Resource Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Premium Figma Case Studies"
                        value={newAssetName}
                        onChange={(e) => setNewAssetName(e.target.value)}
                        className="w-full border dark:border-slate-800 p-2.5 rounded-xl outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-500">Asset Type</label>
                        <select
                          value={newAssetType}
                          onChange={(e) => setNewAssetType(e.target.value)}
                          className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                        >
                          <option value="template">Template</option>
                          <option value="product">Promotional Product</option>
                          <option value="ebook">E-Book</option>
                          <option value="aitool">AI Tool</option>
                          <option value="promotion">Promo Deal</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-500">Category Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Design Assets"
                          value={newAssetCategory}
                          onChange={(e) => setNewAssetCategory(e.target.value)}
                          className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-500">Description Summary</label>
                      <textarea
                        placeholder="Provide detailed description of the asset features..."
                        value={newAssetDesc}
                        onChange={(e) => setNewAssetDesc(e.target.value)}
                        rows={3}
                        className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-500">Price ($)</label>
                        <input
                          type="text"
                          placeholder="0"
                          value={newAssetPrice}
                          onChange={(e) => setNewAssetPrice(e.target.value)}
                          className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-500">Free?</label>
                        <select
                          value={String(newAssetFree)}
                          onChange={(e) => {
                            setNewAssetFree(e.target.value === "true");
                            if (e.target.value === "true") {
                              setNewAssetPremium(false);
                            }
                          }}
                          className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-500">Premium?</label>
                        <select
                          value={String(newAssetPremium)}
                          onChange={(e) => {
                            setNewAssetPremium(e.target.value === "true");
                            if (e.target.value === "true") {
                              setNewAssetFree(false);
                            }
                          }}
                          className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-500">Simulation Download URL</label>
                      <input
                        type="text"
                        placeholder="https://example.com/file.zip"
                        value={newAssetDownload}
                        onChange={(e) => setNewAssetDownload(e.target.value)}
                        className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-500">Features (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="Figma Files included, fully responsive"
                        value={newAssetFeatures}
                        onChange={(e) => setNewAssetFeatures(e.target.value)}
                        className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-500">Tags (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="design, figma, premium"
                        value={newAssetTags}
                        onChange={(e) => setNewAssetTags(e.target.value)}
                        className="w-full border dark:border-slate-800 p-2.5 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0F4C81] text-white p-3 rounded-xl font-bold mt-2 shadow-md"
                    >
                      Publish Resource Live
                    </button>
                  </form>
                </div>

                {/* Support messages inbox */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#00A86B]" />
                    Support Messages Inbox ({adminMessages.length})
                  </h3>

                  {adminMessages.length === 0 ? (
                    <div className="p-8 text-center border dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                      Support inbox is empty. No customer feedback logged yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {adminMessages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl glass-card space-y-3 text-xs shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-sm">{msg.subject}</p>
                              <p className="text-[10px] text-slate-400">From: {msg.name} ({msg.email}) • {new Date(msg.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                              msg.isReplied ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            }`}>
                              {msg.isReplied ? "Replied" : "Unreplied"}
                            </span>
                          </div>

                          <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            &quot;{msg.message}&quot;
                          </p>

                          {msg.isReplied ? (
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                              <p className="font-bold text-[10px] text-emerald-500 uppercase font-mono">Your reply response sent:</p>
                              <p className="text-slate-600 dark:text-slate-300 italic">&quot;{msg.replyMessage}&quot;</p>
                            </div>
                          ) : (
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                id={`reply-input-${msg.id}`}
                                placeholder="Write administrative email reply response here..."
                                className="flex-grow p-2.5 border dark:border-slate-800 rounded-xl text-xs dark:bg-slate-800 outline-none"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const val = (document.getElementById(`reply-input-${msg.id}`) as HTMLInputElement)?.value;
                                    handleAdminReply(msg.id, val);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  const val = (document.getElementById(`reply-input-${msg.id}`) as HTMLInputElement)?.value;
                                  handleAdminReply(msg.id, val);
                                }}
                                className="bg-[#00A86B] text-white px-4 py-2.5 rounded-xl font-bold hover:opacity-90"
                              >
                                Send
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Telemetry and logs */}
              <div className="grid md:grid-cols-2 gap-8 pt-6 border-t dark:border-slate-800">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    Customer Activity Log (SQLite Abstraction Layer)
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border p-4 space-y-2 max-h-60 overflow-y-auto">
                    {adminActivityLogs.map((log) => (
                      <div key={log.id} className="flex justify-between items-center text-[11px] border-b dark:border-slate-800 pb-2 last:border-none last:pb-0">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-bold">{log.userName}:</span>
                          <span className="text-slate-500 dark:text-slate-400">{log.action}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-bold text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-amber-500" />
                    Gemini AI Model Generation API Logs
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border p-4 space-y-2 max-h-60 overflow-y-auto">
                    {adminAiLogs.map((log) => (
                      <div key={log.id} className="space-y-1 border-b dark:border-slate-800 pb-2 last:border-none last:pb-0 text-[10px] leading-relaxed">
                        <div className="flex justify-between font-mono text-slate-400">
                          <span className="font-bold text-amber-500 capitalize">{log.type} Prompt Call</span>
                          <span>{log.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300"><span className="font-bold">Prompt:</span> &quot;{log.prompt}&quot;</p>
                        <p className="text-slate-500 italic"><span className="font-bold">Response:</span> {log.response.slice(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PRIVACY POLICY */}
          {activePage === "privacy" && (
            <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prose dark:prose-invert max-w-3xl mx-auto space-y-6">
              <h1 className="font-display font-bold text-3xl">Privacy Policy Guidelines</h1>
              <p className="text-sm leading-relaxed text-slate-500">
                At DURE-BORU, accessible from our digital platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DURE-BORU and how we use it.
              </p>
              <h3 className="font-bold text-lg">Information We Collect</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
              <h3 className="font-bold text-lg">How We Use Your Information</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We use the information we collect in various ways, including to provide, operate, and maintain our website, improve and personalize recommendations, understand how you use our digital tools, and develop newly automated generative support bots.
              </p>
            </motion.div>
          )}

          {/* TERMS OF SERVICE */}
          {activePage === "terms" && (
            <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prose dark:prose-invert max-w-3xl mx-auto space-y-6">
              <h1 className="font-display font-bold text-3xl">Terms of Service agreements</h1>
              <p className="text-sm leading-relaxed text-slate-500">
                Welcome to DURE-BORU! These terms and conditions outline the rules and regulations for the use of DURE-BORU&apos;s Digital Asset concierge Platform. By accessing this website, we assume you accept these terms and conditions. Do not continue to use DURE-BORU if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <h3 className="font-bold text-lg">Intellectual Property Rights</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Unless otherwise stated, DURE-BORU and/or its licensors own the intellectual property rights for all material on DURE-BORU. All intellectual property rights are reserved. You may access this from DURE-BORU for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <h3 className="font-bold text-lg">Reservation of Rights</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and its linking policy at any time.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* DETAILED ASSET MODAL DIALOG */}
      <AnimatePresence>
        {selectedDetailAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row glass-card shadow-2xl"
            >
              <div className="md:w-1/2 relative bg-slate-100 dark:bg-slate-800">
                <img src={selectedDetailAsset.imageUrl} alt={selectedDetailAsset.name} className="w-full h-full object-cover min-h-[250px]" />
                <span className="absolute top-4 left-4 bg-[#0F4C81] text-white font-mono text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {selectedDetailAsset.isPremium ? "Premium" : "Free"}
                </span>
              </div>

              <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-6 max-h-[500px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-bold font-mono text-[#0F4C81] dark:text-[#00A86B] uppercase">{selectedDetailAsset.category}</p>
                    <button onClick={() => setSelectedDetailAsset(null)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  <h3 className="font-display font-bold text-2xl leading-snug">{selectedDetailAsset.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedDetailAsset.description}</p>

                  <div className="space-y-2">
                    <p className="text-xs font-bold">Main Features Included:</p>
                    <ul className="text-[11px] text-slate-500 space-y-1">
                      {selectedDetailAsset.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add Rating form */}
                  <form onSubmit={handleSubmitReview} className="pt-4 border-t dark:border-slate-800 space-y-2 text-xs">
                    <p className="font-bold">Leave a Rating & Review</p>
                    <div className="flex gap-2 items-center">
                      <select
                        value={newRatingScore}
                        onChange={(e) => setNewRatingScore(parseInt(e.target.value))}
                        className="p-1.5 border dark:border-slate-700 rounded-lg dark:bg-slate-800"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                        <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                        <option value="3">⭐⭐⭐ 3 Stars</option>
                        <option value="2">⭐⭐ 2 Stars</option>
                        <option value="1">⭐ 1 Star</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Write a brief review..."
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        className="flex-grow p-1.5 border dark:border-slate-700 rounded-lg dark:bg-slate-800 outline-none"
                      />
                      <button type="submit" className="bg-[#00A86B] text-white px-3 py-1.5 rounded-lg font-bold">Post</button>
                    </div>
                  </form>
                </div>

                <div className="pt-4 border-t dark:border-slate-800 flex items-center justify-between">
                  <span className="font-extrabold text-lg text-[#0F4C81] dark:text-emerald-400">
                    {selectedDetailAsset.isFree ? "FREE" : `$${selectedDetailAsset.price}`}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleFavorite(selectedDetailAsset)}
                      className="p-2.5 rounded-xl border dark:border-slate-700"
                    >
                      <Heart className={`w-4 h-4 ${
                        favorites.includes(selectedDetailAsset.id) ? "text-rose-500 fill-rose-500" : "text-slate-500"
                      }`} />
                    </button>
                    <button
                      onClick={() => {
                        handleDownload(selectedDetailAsset);
                        setSelectedDetailAsset(null);
                      }}
                      className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 text-xs shadow-md"
                    >
                      <Download className="w-4 h-4" /> Download File
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING AI CHAT CONCIERGE ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3" id="floating-chat-container">
        
        {/* Chat Balloon Pop-up */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-80 sm:w-96 h-[450px] rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl glass-card text-slate-800 dark:text-white"
            >
              {/* Header */}
              <div className="bg-[#0F4C81] text-white px-4 py-3 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00A86B] flex items-center justify-center font-bold font-mono">B</div>
                  <div>
                    <h4 className="font-bold text-xs">Boru AI Support Concierge</h4>
                    <p className="text-[9px] text-slate-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Support Live
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:opacity-85">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Logs */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3 text-xs leading-relaxed max-h-[300px]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl shadow-sm ${
                      msg.role === "user" 
                        ? "bg-[#0F4C81] text-white rounded-tr-none" 
                        : "bg-slate-100 dark:bg-slate-800 rounded-tl-none text-slate-800 dark:text-slate-100"
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[8px] text-slate-400 mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}

                {isChatTyping && (
                  <div className="flex items-center gap-2 mr-auto max-w-[80%]">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-[#0F4C81] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Boru AI about premium files..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow px-3 py-2 glass-input outline-none focus:border-[#0F4C81] rounded-xl text-xs text-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Float Balloon Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F4C81] to-[#00A86B] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-2xl cursor-pointer relative transition-transform"
          id="chat-toggle-floating-btn"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC107] border-2 border-white dark:border-slate-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC107] border-2 border-white dark:border-slate-950" />
        </button>
      </div>

      {/* FOOTER SECTION */}
      <footer className="py-12 border-t mt-16 transition-colors duration-200 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center text-white font-bold font-mono">DB</div>
              <span className="font-display font-extrabold text-xl bg-gradient-to-r from-[#0F4C81] to-[#00A86B] bg-clip-text text-transparent">DURE-BORU</span>
            </div>
            <p className="text-xs leading-relaxed">
              Modern AI-powered Customer Service & digital assets distribution platform. Locate customizable eco-friendly business folders, pitch layout grids, and e-book PDFs instantly.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#333333] dark:text-white mb-4">Resource Directories</h4>
            <ul className="text-xs space-y-2.5">
              <li><button onClick={() => { setActivePage("products"); setSelectedResourceType("product"); }} className="hover:underline hover:text-[#0F4C81]">Promotional Goods</button></li>
              <li><button onClick={() => { setActivePage("creative-templates"); setSelectedResourceType("All"); }} className="hover:underline hover:text-[#0F4C81]">Creative Layouts</button></li>
              <li><button onClick={() => { setActivePage("ebook-library"); setSelectedResourceType("All"); }} className="hover:underline hover:text-[#0F4C81]">Guides & E-books</button></li>
              <li><button onClick={() => { setActivePage("ai-tools"); setSelectedResourceType("All"); }} className="hover:underline hover:text-[#0F4C81]">Sentiment AI Tools</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#333333] dark:text-white mb-4">Platform & Ethics</h4>
            <ul className="text-xs space-y-2.5">
              <li><button onClick={() => setActivePage("privacy")} className="hover:underline hover:text-[#0F4C81]">Privacy Guidelines</button></li>
              <li><button onClick={() => setActivePage("terms")} className="hover:underline hover:text-[#0F4C81]">Terms of Agreements</button></li>
              <li><button onClick={() => setActivePage("contact")} className="hover:underline hover:text-[#0F4C81]">Help Center Ticket</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#333333] dark:text-white mb-4">Independent Deployment</h4>
            <p className="text-xs leading-relaxed mb-3">Compatible with awarded InfinityFree, AwardSpace, free Render, Koyeb, or standard Vercel containers.</p>
            <div className="flex gap-2">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[9px] font-mono font-bold uppercase">React 19</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[9px] font-mono font-bold uppercase">NextJS 15</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[9px] font-mono font-bold uppercase">SQLite</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t dark:border-slate-800 text-center text-xs">
          <p>© 2026 DURE-BORU AI Platform. All rights reserved. Made under Google AI Studio Build system.</p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Check, X as XIcon, ChevronRight, 
  Monitor, Smartphone, BarChart3, Rocket, 
  Video, Mail, MapPin, ExternalLink, Zap,
  Layers, ShieldCheck, TrendingUp
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 3D BACKGROUND                               */
/* -------------------------------------------------------------------------- */

function StarField(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[1, 0, -2]} scale={0.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.1} />
            </mesh>
            <mesh position={[-1, -1, -1]} scale={0.3}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#ec4899" wireframe transparent opacity={0.1} />
            </mesh>
        </Float>
    )
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <StarField />
        <FloatingShapes />
      </Canvas>
      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950 pointer-events-none" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                */
/* -------------------------------------------------------------------------- */

const SectionHeading = ({ children, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12 text-center"
  >
    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 inline-block">
      {children}
    </h2>
    {subtitle && <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>}
  </motion.div>
);

const Card = ({ children, className = "", featured = false }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`relative backdrop-blur-xl border ${
      featured 
        ? 'bg-slate-800/60 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
        : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600'
    } rounded-2xl p-8 transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        pink: "bg-pink-500/20 text-pink-300 border-pink-500/30",
        purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]} mb-4 inline-block`}>
            {children}
        </span>
    )
}

/* -------------------------------------------------------------------------- */
/* SECTIONS                                    */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y }} 
        className="container mx-auto px-6 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6">
            As.Harbor <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Studio</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide mb-8">
            Digital Marketing & Creative Production
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base text-slate-400 mb-10">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-purple-400"/> 福島・茨城・栃木エリア対応</span>
            <span className="hidden md:inline">|</span>
            <span>中小企業支援ワンストップサービス</span>
          </div>
          
          <motion.a 
             href="#contact"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
          >
            無料相談を予約する
          </motion.a>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-slate-500 mx-auto mb-2"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

const Features = () => {
    const features = [
        { icon: <Layers size={32} />, title: "ワンストップ対応", desc: "動画・Web・広告運用を一貫サポート。窓口一本化で管理コストを削減。" },
        { icon: <Zap size={32} />, title: "スピード & 高品質", desc: "STUDIO等のノーコードとAI技術を駆使し、短納期かつ高品質なクリエイティブを実現。" },
        { icon: <BarChart3 size={32} />, title: "データドリブン", desc: "GA4・GTMによる解析から改善提案まで。感覚ではなく数値に基づく成長戦略。" },
        { icon: <Monitor size={32} />, title: "地域密着型", desc: "福島・茨城・栃木エリアは直接訪問可能。対面での温度感のある支援を。" },
    ];

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <SectionHeading subtitle="大手制作会社にはないスピード感と、フリーランスを超える技術力。">
                    Why As.Harbor?
                </SectionHeading>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 rounded-xl hover:bg-slate-800/60 transition-colors group"
                        >
                            <div className="mb-4 text-purple-400 group-hover:text-purple-300 transition-colors bg-purple-900/20 p-3 rounded-lg inline-block">{f.icon}</div>
                            <h3 className="text-xl font-bold text-slate-100 mb-2">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WebProduction = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <SectionHeading subtitle="プロフェッショナルなWebサイトで、ビジネスの信頼性を確立します。">
                    Web Production
                </SectionHeading>

                {/* Website Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { 
                            title: "Simple", 
                            price: "250,000", 
                            target: "名刺代わりのサイト",
                            desc: "STUDIO制作 / 5ページ以内 / スマホ対応 / 基本デザイン",
                            features: ["レスポンシブ対応", "お問い合わせフォーム", "GA4基本設定", "制作期間 3~4週間"]
                        },
                        { 
                            title: "Standard", 
                            price: "450,000", 
                            target: "集客と信頼獲得",
                            featured: true,
                            desc: "WordPress / 10ページ以内 / オリジナルデザイン / SEO対策",
                            features: ["SEO内部対策", "お知らせ機能 (CMS)", "GA4/GTM詳細設定", "制作期間 1.5~2ヶ月", "原稿サポート"]
                        },
                        { 
                            title: "Premium", 
                            price: "750,000", 
                            target: "ブランディング強化",
                            desc: "WordPress / 15ページ以内 / フルカスタム / 撮影込み",
                            features: ["プロカメラマン撮影", "高度なアニメーション", "戦略的ライティング", "コンバージョン設計", "制作期間 2~3ヶ月"]
                        },
                    ].map((plan, i) => (
                        <Card key={i} featured={plan.featured} className="flex flex-col">
                            {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">RECOMMENDED</div>}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                            <p className="text-slate-400 text-sm mb-6">{plan.target}</p>
                            <div className="text-3xl font-bold text-white mb-1">¥{plan.price}<span className="text-base font-normal text-slate-500">~</span></div>
                            <p className="text-slate-400 text-xs mb-6">+ 税</p>
                            
                            <p className="text-slate-300 text-sm mb-6 pb-6 border-b border-slate-700/50">
                                {plan.desc}
                            </p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-start text-sm text-slate-300">
                                        <Check size={16} className="text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>

                {/* LP Pricing */}
                <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-slate-800">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <Rocket className="mr-3 text-pink-400" /> LP (ランディングページ) 制作
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 border-b border-slate-700 text-sm">
                                    <th className="py-4 px-4 font-normal">プラン名</th>
                                    <th className="py-4 px-4 font-normal">料金 (税抜)</th>
                                    <th className="py-4 px-4 font-normal">特徴</th>
                                    <th className="py-4 px-4 font-normal">制作期間</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-200">
                                <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 px-4 font-bold">Simple LP</td>
                                    <td className="py-4 px-4 text-xl font-bold text-purple-400">¥280,000</td>
                                    <td className="py-4 px-4 text-sm">テンプレートベース / デザイン調整 / 修正2回</td>
                                    <td className="py-4 px-4 text-sm">3週間</td>
                                </tr>
                                <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 px-4 font-bold">Standard LP</td>
                                    <td className="py-4 px-4 text-xl font-bold text-purple-400">¥380,000</td>
                                    <td className="py-4 px-4 text-sm">構成設計 / オリジナルデザイン / ABテスト準備 / 修正3回</td>
                                    <td className="py-4 px-4 text-sm">4週間</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 px-4 font-bold">Premium LP</td>
                                    <td className="py-4 px-4 text-xl font-bold text-purple-400">¥550,000</td>
                                    <td className="py-4 px-4 text-sm">戦略設計 / ライティング込 / フルオリジナル / 修正5回</td>
                                    <td className="py-4 px-4 text-sm">5~6週間</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 rounded-lg border border-purple-500/20 text-center">
                        <p className="text-purple-200 text-sm">
                            🎁 <span className="font-bold text-white">セット割引特典:</span> 新規サイト制作と同時に月額プラン（半年以上）をご契約いただくと、制作費が <span className="text-pink-400 font-bold text-lg">10% OFF</span> になります。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MonthlyPlans = () => {
    return (
        <section className="py-24 bg-slate-900/20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-6 relative">
                <SectionHeading subtitle="制作後の「育てる」フェーズも万全に。継続的な改善で成果を最大化します。">
                    Monthly Support
                </SectionHeading>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Start Plan */}
                    <Card className="flex flex-col border-t-4 border-t-slate-500">
                        <div className="mb-4">
                            <Badge color="blue">お手軽</Badge>
                            <h3 className="text-2xl font-bold text-white">Start</h3>
                            <div className="text-4xl font-bold text-slate-200 mt-2">¥29,800<span className="text-sm font-normal text-slate-500">/月</span></div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">Webサイトの保守・管理を任せたい方向け。</p>
                        
                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-blue-400 mr-2 mt-0.5" /> サーバー・ドメイン管理</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-blue-400 mr-2 mt-0.5" /> 月1回の軽微な更新</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-blue-400 mr-2 mt-0.5" /> 簡易レポート</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-blue-400 mr-2 mt-0.5" /> メールサポート</div>
                        </div>
                        <button className="w-full py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-bold">詳細を見る</button>
                    </Card>

                    {/* Business Plan (Featured) */}
                    <Card featured={true} className="flex flex-col transform md:-translate-y-4 border-t-4 border-t-purple-500">
                        <div className="mb-4">
                            <Badge color="pink">一番人気</Badge>
                            <h3 className="text-2xl font-bold text-white">Business</h3>
                            <div className="text-5xl font-bold text-purple-400 mt-2">¥59,800<span className="text-sm font-normal text-slate-400">/月</span></div>
                        </div>
                        <p className="text-slate-300 text-sm mb-6">データ分析に基づく改善提案で集客を加速。</p>
                        
                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex items-start text-sm text-white font-medium"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> スタートプランの全内容</div>
                            <div className="flex items-start text-sm text-white"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> 月2回の更新対応</div>
                            <div className="flex items-start text-sm text-white"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> <span className="font-bold border-b border-pink-500/50">詳細分析レポート & 改善提案</span></div>
                            <div className="flex items-start text-sm text-white"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> Google広告診断</div>
                            <div className="flex items-start text-sm text-white"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> 定例MTG (月1回)</div>
                            <div className="flex items-start text-sm text-white"><Check size={16} className="text-pink-400 mr-2 mt-0.5" /> SNS投稿企画サポート</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg mb-4 text-center">
                            <p className="text-xs text-slate-400">年間契約なら <span className="text-green-400 font-bold">10% OFF</span> (¥53,820/月)</p>
                        </div>
                        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition-colors text-sm font-bold shadow-lg">このプランで相談する</button>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="flex flex-col border-t-4 border-t-amber-500">
                        <div className="mb-4">
                            <Badge color="purple">経営層向け</Badge>
                            <h3 className="text-2xl font-bold text-white">Premium</h3>
                            <div className="text-4xl font-bold text-slate-200 mt-2">¥298,000<span className="text-sm font-normal text-slate-500">/月</span></div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">専任チームによる包括的なWebマーケティング支援。</p>
                        
                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-amber-400 mr-2 mt-0.5" /> Webサイト更新 無制限</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-amber-400 mr-2 mt-0.5" /> SNS運用代行 (月12投稿)</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-amber-400 mr-2 mt-0.5" /> 広告運用代行手数料込み</div>
                            <div className="flex items-start text-sm text-slate-300"><Check size={16} className="text-amber-400 mr-2 mt-0.5" /> 月次戦略会議</div>
                            <div className="flex items-start text-sm text-amber-200 bg-amber-900/20 p-2 rounded"><ShieldCheck size={16} className="text-amber-400 mr-2 mt-0.5 inline" /> 制作案件 30% OFF</div>
                        </div>
                        <button className="w-full py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-bold">詳細を見る</button>
                    </Card>
                </div>
            </div>
        </section>
    );
};

const Options = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <SectionHeading subtitle="必要な機能を、必要な分だけ。柔軟なカスタマイズが可能です。">
                    Optional Services
                </SectionHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Ads & Analytics */}
                    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <TrendingUp className="mr-3 text-blue-400" /> 広告・分析・マーケティング
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">Google広告初期設定</span>
                                <span className="text-slate-200 font-bold">¥47,500</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">広告運用代行</span>
                                <span className="text-slate-200 font-bold">広告費の20%</span>
                            </li>
                             <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">GA4初期設定</span>
                                <span className="text-slate-200 font-bold">¥15,700</span>
                            </li>
                             <li className="flex justify-between items-center pb-2">
                                <span className="text-slate-300 text-sm">GTM初期設定</span>
                                <span className="text-slate-200 font-bold">¥14,900</span>
                            </li>
                        </ul>
                    </div>

                    {/* Creative */}
                    <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Video className="mr-3 text-pink-400" /> 動画・デザイン・クリエイティブ
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">動画撮影 (1h)</span>
                                <span className="text-slate-200 font-bold">¥10,000~</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">動画編集 (1分/カット+テロップ)</span>
                                <span className="text-slate-200 font-bold">¥16,400</span>
                            </li>
                             <li className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-slate-300 text-sm">AI動画生成 (SNS用短尺)</span>
                                <span className="text-slate-200 font-bold">¥7,000~</span>
                            </li>
                             <li className="flex justify-between items-center pb-2">
                                <span className="text-slate-300 text-sm">バナー制作</span>
                                <span className="text-slate-200 font-bold">¥5,300~</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="text-center text-slate-500 text-sm mt-8">※ 上記オプションは月額プラン契約者様には10%割引が適用されます。</p>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-purple-900/20 to-slate-950 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Project</h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                        初回相談は<strong>無料</strong>です。<br/>
                        ご予算やビジネスの課題に合わせて、最適なプランをご提案いたします。
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
                        <a href="mailto:contact@asharbor.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                            <Mail size={20} />
                            お問い合わせフォーム
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-[#06C755] text-white rounded-full font-bold hover:bg-[#05b34c] transition-colors">
                            <Smartphone size={20} />
                            LINEで相談する
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>福島県・茨城県・栃木県 (訪問対応可)</span>
                        </div>
                        <div className="hidden md:block w-1 h-1 bg-slate-600 rounded-full"></div>
                         <div className="flex items-center gap-2">
                            <Monitor size={16} />
                            <span>全国オンライン対応</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">As.Harbor Studio</h2>
                <p className="text-slate-500 text-sm mt-2">Digital Marketing & Creative Production</p>
            </div>
            <div className="text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} As.Harbor Studio. All rights reserved.
            </div>
        </div>
    </footer>
);

/* -------------------------------------------------------------------------- */
/* MAIN APP                                    */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-purple-500/30">
      <Background3D />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg"></div>
            As.Harbor
          </div>
          <a href="#contact" className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${isScrolled ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            お問い合わせ
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <Features />
        <WebProduction />
        <MonthlyPlans />
        <Options />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

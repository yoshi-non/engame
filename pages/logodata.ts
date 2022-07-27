import { v4 as uuidv4 } from "uuid"

const logoData = [
    {
        id: uuidv4(),
        name: "HTML",
        description: "HTMLとは「ハイパーテキスト・マークアップ・ランゲージ（Hyper Text Markup Language）」のことで、WEBページを作成するための言語です。",
        thumbnail: {
            url: "../images/engame-icons/HTML.png",
        }
    },
    {
        id: uuidv4(),
        name: "CSS",
        description: "CSSとは「Cascading Style Sheets」 の頭文字をとったものであり、スタイルシートとも呼ばれます。 HTMLは見出しやヘッダー情報などWebページの文書構造を形作るための言語です。",
        thumbnail: {
            url: "../images/engame-icons/CSS.png",
        }
    },
    {
        id: uuidv4(),
        name: "JavaScript",
        description: "JavaScript はクライアント側で実行されるオブジェクト指向型のスクリプト言語です。",
        thumbnail: {
            url: "../images/engame-icons/JavaScript.png",
        }
    },
    {
        id: uuidv4(),
        name: "Java",
        description: "Javaは、汎用プログラミング言語とソフトウェアプラットフォームの双方を指している総称ブランドである。",
        thumbnail: {
            url: "../images/engame-icons/Java.png",
        }
    },
    {
        id: uuidv4(),
        name: "Docker",
        description: "Dockerは、コンテナ仮想化を用いてアプリケーションを開発・配置・実行するためのオープンプラットフォームである。",
        thumbnail: {
            url: "../images/engame-icons/Docker.png",
        }
    },
]

export default logoData;

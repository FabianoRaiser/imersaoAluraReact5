import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favoritos";

function HomePage() {
    const estiloDaPagina = {
        // backgroundColor: "red" 
        };

    //console.log(config.playlist);

    return (
        <>
        <CSSReset />
        <div style={estiloDaPagina}>
            <Menu />
            <Header />
            <Timeline playlists={config.playlists} />
            <Favoritos favoritos={config.favoritos} />
        </div>
        </>
    )
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    .user-info img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

    .imgBanner {
        width: 100%;
        height: 45vh;
        object-fit: cover;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <section>
            <img src={config.banner} className="imgBanner" />
            </section>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {
    console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);


    return (
        <StyledTimeline>
            {playlistNames.map((playlistNames) => {
                const videos = props.playlists[playlistNames];
                return (
                    <section>
                        <h2>{playlistNames}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={   video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    )
}

function Favoritos(props){
    const listFavoritos = Object.keys(props.favoritos);

    return (
        <StyledFavorites>
            {listFavoritos.map((listFavoritos) => {
                const canais = props.favoritos[listFavoritos];
                console.log(canais);
                return (
                    <section>
                        <h2>{listFavoritos}</h2>
                        <div>
                            {canais.map((canais) => {
                                return (
                                    <a href={   canais.urlUser}>
                                        <img src={canais.imgUser} />
                                        <span>
                                            {canais.nameUser}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledFavorites>
    )
}